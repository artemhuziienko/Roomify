interface AuthState{
    isSignedIn: boolean;
    userName: string | null,
    userId: string | null,
}

type AuthAction ={
    isSignedIn: boolean;
    userName: string | null,
    userId: string | null,
    refreshAuth: () => Promise<boolean>,
    SignIn: () => Promise<boolean>,
    SignOut: () => Promise<boolean>,
}

type AuthContext = {
    isSignedIn: boolean;
    userName: string | null;
    userId: string | null;
    refreshAuth: () => Promise<boolean>;
    signIn: () => Promise<boolean>;
    signOut: () => Promise<boolean>;
};