import { createContext } from "react";
import { Dialog } from "./types";

const defaults = {
  confirm: () => {
    return new Promise<boolean>((resolve) => {
      resolve(false);
    })
  },
  prompt: () => {
    return new Promise<string | undefined | false>((resolve) => {
      resolve(false);
    })
  },
  alert: () => {
    return new Promise<void>((resolve) => {
      resolve();
    })
  }
}

export const DialogContext = createContext<Dialog>(defaults)