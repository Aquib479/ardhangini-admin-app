import { createContext } from "react";
import { Configuration } from "../services/openapi";
import { toast } from "react-toastify";

export class RootContext {
  appName: string | undefined;
}

export const rootContext = createContext<RootContext | null>(null);
export const config: Configuration = new Configuration();
config.basePath = "http://localhost:3001";
export const showToast = (message: string) =>
  toast(message, { autoClose: 100 });
export const defaultColDef = {
  flex: 1,
};
