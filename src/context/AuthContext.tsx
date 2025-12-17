import React, { createContext, useContext, useState } from "react";

const AUTH_KEY: string = "app-auth";

type User = {name: string};

type user = User | 'null';

type AuthContextType = {
  user: user
  LoginPage: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
}

export default function AuthProvider({children}:AuthProviderProps){

    const currentAuth = window.localStorage.getItem(AUTH_KEY);
    const storedAuth = currentAuth === user ? user : 'null';

    const[auth, setAuth] = useState<user>(storedAuth);
}