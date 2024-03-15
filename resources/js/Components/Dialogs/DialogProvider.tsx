import { PropsWithChildren, useCallback, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { DialogState } from "./types";
import PromptDialog from "./PromptDialog";
import { DialogContext } from "./DialogContext";
import AlertDialog from "./AlertDialog";


export function DialogProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DialogState>({open: false, value: ''})
  const [dialogType, setDialogType] = useState<"COMFIRM" | "PROMPT" | "ALERT">("COMFIRM");
  const onCloseFn = useRef<() => void>();
  const onConfirmFn = useRef<() => void>();
  const onPromptConfirmFn = useRef<(value : string | undefined) => void>();

  const confirm = useCallback((data: DialogState) => {
    setDialogType("COMFIRM");

    return new Promise<boolean>((resolve) => {

      onConfirmFn.current = () => {
        resolve(true);
        setState((current) => ({...current, open: false }));
      }

      onCloseFn.current = () => {
        resolve(false);
        setState((current) => ({...current, open: false}));
      }

      setState((current) => ({
        ...current,
        ...data,
        open: true,
      }));
    })
  }, [])

  const prompt = useCallback((data: DialogState) => {
    setDialogType("PROMPT");

    return new Promise<string | undefined | false>((resolve) => {
      onPromptConfirmFn.current = (value : string | undefined) => {
        resolve(value);
        setState((current) => ({...current,open: false, value: '' }));
      }

      onCloseFn.current = () => {
        resolve(false);
        setState((current) => ({...current,open: false, value: '' }));
      }

      // open the dialog
      setState((current) => ({
        ...current,
        ...data,
        open: true,
      }));
    })
  }, [])

  const alert = useCallback((data: DialogState) => {
    setDialogType("ALERT");

    return new Promise<void>((resolve) => {

      onConfirmFn.current = () => {
        resolve();
        setState((current) => ({...current, open: false }));
      }

      setState((current) => ({
        ...current,
        ...data,
        open: true,
      }));
    })
  }, [])

  return (
    <DialogContext.Provider value={{ confirm, prompt, alert }}>
      {children}
      {dialogType === "COMFIRM" &&
        <ConfirmDialog
          {...state}
          onClose={() => onCloseFn.current && onCloseFn.current()}
          onConfirm={() => onConfirmFn.current && onConfirmFn.current()}
        />
      }
      {dialogType === "PROMPT" &&
        <PromptDialog
          {...state}
          onChange={(value) => setState((current) => ({ ...current, value }))}
          onClose={() => onCloseFn.current && onCloseFn.current()}
          onConfirm={() => onPromptConfirmFn.current && onPromptConfirmFn.current(state.value)}
        />
      }
      {dialogType === "ALERT" &&
        <AlertDialog
          {...state}
          onClose={() => onCloseFn.current && onCloseFn.current()}
          onConfirm={() => onConfirmFn.current && onConfirmFn.current()}
        />
      }
    </DialogContext.Provider>
  )
}
