import puter from "@heyputer/puter.js";

export const signOut = async () => puter.auth.signOut();

export const signIn = async () => await puter.auth.signIn();

export const getCurrentUser = async () => {
    try{
        return await puter.auth.getUser();
    }   catch{
        return null;
    }
}