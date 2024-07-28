import { createContext } from "react";


export class RootContext {
    appName: string | undefined;
}

export const rootContext = createContext<RootContext| null>(null);