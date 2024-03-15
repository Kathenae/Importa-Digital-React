export type DialogState = {
  open?: boolean,
  title?: string,
  description?: string,
  value?: string,
  onChange?: (value : string) => void,
  onClose?: () => void,
  onConfirm?: () => void,
}

export type Dialog = {
  confirm : (data: DialogState) => Promise<boolean>,
  prompt: (data: DialogState) => Promise<string | undefined | false>,
  alert: (data: DialogState) => Promise<void>,
}