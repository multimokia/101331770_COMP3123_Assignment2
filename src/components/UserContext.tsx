import { createContext } from "react";

export class UserSession {
    username: string | null
    token: string | null

    constructor() {
        this.username = null;
        this.token = null;
    }

    setUsername(value: string) {
        this.username = value;
    }

    setToken(value: string) {
        this.token = value;
    }
}

export const UserContext = createContext<UserSession>(new UserSession());
