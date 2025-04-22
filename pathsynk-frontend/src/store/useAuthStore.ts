import { create } from 'zustand';

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    profile: string;
    dateJoined: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
    setAuth: (token, user) => {
        set({ token, user });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    },
    logout: () => {
        set({ token: null, user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
}));
