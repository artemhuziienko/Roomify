import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { loadEnvFile } from 'node:process';
loadEnvFile();

const openai = new OpenAI();

const app = express()
const port = 3007

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Must be before all routes
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

const ROOMIFY_RENDER_PROMPT = `
TASK: Convert the input 2D floor plan into a **photorealistic, top‑down 3D architectural render**.

STRICT REQUIREMENTS (do not violate):
1) **REMOVE ALL TEXT**: Do not render any letters, numbers, labels, dimensions, or annotations. Floors must be continuous where text used to be.
2) **GEOMETRY MUST MATCH**: Walls, rooms, doors, and windows must follow the exact lines and positions in the plan. Do not shift or resize.
3) **TOP‑DOWN ONLY**: Orthographic top‑down view. No perspective tilt.
4) **CLEAN, REALISTIC OUTPUT**: Crisp edges, balanced lighting, and realistic materials. No sketch/hand‑drawn look.
5) **NO EXTRA CONTENT**: Do not add rooms, furniture, or objects that are not clearly indicated by the plan.

STRUCTURE & DETAILS:
- **Walls**: Extrude precisely from the plan lines. Consistent wall height and thickness.
- **Doors**: Convert door swing arcs into open doors, aligned to the plan.
- **Windows**: Convert thin perimeter lines into realistic glass windows.

FURNITURE & ROOM MAPPING (only where icons/fixtures are clearly shown):
- Bed icon → realistic bed with duvet and pillows.
- Sofa icon → modern sectional or sofa.
- Dining table icon → table with chairs.
- Kitchen icon → counters with sink and stove.
- Bathroom icon → toilet, sink, and tub/shower.
- Office/study icon → desk, chair, and minimal shelving.
- Porch/patio/balcony icon → outdoor seating or simple furniture (keep minimal).
- Utility/laundry icon → washer/dryer and minimal cabinetry.

STYLE & LIGHTING:
- Lighting: bright, neutral daylight. High clarity and balanced contrast.
- Materials: realistic wood/tile floors, clean walls, subtle shadows.
- Finish: professional architectural visualization; no text, no watermarks, no logos.
`.trim();

app.post('/generate_image', async (req, res) => {
    try {
        const { image, mimeType = 'image/jpeg' } = req.body;

        // image is already raw base64 (no prefix) — don't strip again
        const response = await openai.responses.create({
            model: "gpt-5.5",
            input: [{
                role: "user",
                content: [
                    { type: "input_text", text: ROOMIFY_RENDER_PROMPT },
                    {
                        type: "input_image",
                        image_url: `data:${mimeType};base64,${image}`,
                    },
                ],
            }],
            tools: [{ type: "image_generation", quality: "medium" }],
        });

        const imageResult = response.output?.find(o => o.type === 'image_generation_call');
        if (!imageResult) {
            return res.status(500).json({ error: 'No image in response', raw: response });
        }

        // Add proper base64 prefix before sending back
        res.json({ image: `data:image/png;base64,${imageResult.result}` });
    } catch (err) {
        console.error('OpenAI error:', err);  // <-- check your terminal for this
        res.status(500).json({ error: err.message });
    }
});

app.use((err, req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    console.error('Express error:', err.message);
    res.status(500).json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
