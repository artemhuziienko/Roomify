import puter from "@heyputer/puter.js";

import {getOrCreateHostingConfig, uploadImageToHosting} from "./puter.hosting"
import {isHostedUrl} from "./utils";

export const signOut = async () => puter.auth.signOut();

export const signIn = async () => await puter.auth.signIn();

export const getCurrentUser = async () => {
    try{
        return await puter.auth.getUser();
    }   catch{
        return null;
    }
}

export const createProject = async ({ item, visibility = "private" }: CreateProjectParams): Promise<DesignItem | null | undefined> => {
    const projectId = item.id;

    const hosting = await getOrCreateHostingConfig();

    const hostedSource = projectId ?
        await uploadImageToHosting({
            hosting, url: item.sourceImage, projectId, label: 'source',
        }) : null;

    const hostedRender = projectId && projectId && item.renderedImage ?
        await uploadImageToHosting({
            hosting, url: item.renderedImage, projectId, label: 'rendered',
        }) : null;

    const resolvedSource = hostedSource?.url ?
        hostedSource?.url : item.sourceImage && (isHostedUrl(item.sourceImage)) ?
        item.sourceImage : '';

    if (!resolvedSource) {
        console.warn('Failed to host source image, skippping save.')
        return null;
    }

    const resolvedRender = hostedRender?.url ?
        hostedRender?.url : item.renderedImage && isHostedUrl((item.renderedImage)) ?
            item.renderedImage : undefined;

    const {
        sourcePath: _sourcePath,
        renderedPath: _renderPath,
        publicPath: _publicPath,
        ...rest
    } = item;

    const payload = {
        ...rest,
        sourceImage: resolvedSource,
        renderedImage: resolvedRender,
    }

    console.log(payload, hosting, hostedSource);

    try {
        // Call Puter

        return payload;
    }
    catch(error) {
        console.log('Failed to save project', error)
        return null;
    }
}