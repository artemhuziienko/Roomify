# AI Room Planning Tool

> Upload a floor plan. Get a realistic AI-generated room render in seconds.

A web application that takes a floor plan as input and uses AI to generate realistic 3D-style room renders. Built with React and powered by the OpenAI DALL·E API.

---

## Screenshots

<img width="1909" height="879" alt="image" src="https://github.com/user-attachments/assets/54bc56f0-5484-4a22-abf3-f02d9dda1423" />

https://github.com/user-attachments/assets/e4401955-5d60-4305-8d46-e510c8307525

---

## Features

- Floor plan upload — accepts image input of a room's floor plan
- AI-powered rendering — sends the layout to DALL·E to generate a realistic room visualization
- Responsive UI — works cleanly across desktop and mobile screen sizes
- Authentication — secure user authentication via third-party auth provider
- File storage — uploaded plans and generated renders are stored persistently
- Instant results — renders are returned and displayed in the browser without page reload

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, JavaScript, CSS |
| AI / Image Generation | OpenAI DALL·E API |

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation


# Clone the repository
```
git clone https://github.com/YOUR_USERNAME/ai-room-planning-tool.git
cd ai-room-planning-tool
```

# Install dependencies
```
npm install
```

### Running Locally
```
npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How It Works

1. The user uploads an image of a room's floor plan through the web interface
2. The app sends the floor plan along with a structured prompt to the OpenAI DALL·E API
3. DALL·E generates a realistic 3D-style render of what the room could look like
4. The result is displayed instantly in the browser and saved to cloud storage for the user's session
