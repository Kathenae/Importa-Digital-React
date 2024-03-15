import { Popup } from "@/types";
import { translate } from "@/utils";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";

interface PopupContextData {
    alert: (message: string, variant: 'success' | 'info' | 'danger' | 'warning') => Promise<void>,
    confirm: (message: string) => Promise<boolean>,
}

const PopupContext = createContext<PopupContextData | undefined>(undefined)

interface PopupComponentProps extends Popup {
    open: boolean,
    onOk: () => void,
    onConfirm: (confirmed: boolean) => void,
    onClose: () => void,
}

export function PopupProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<Popup>({ message: '', type: 'alert', variant: 'success', });
    const [open, setOpen] = useState(false);
    const onConfirmFn = useRef<(confirmed: boolean) => void>()
    const onOkFn = useRef<() => void>()
    const onCloseFn = useRef<() => void>()

    const confirm = useCallback((message: string) => {
        return new Promise<boolean>((resolve) => {
            onConfirmFn.current = (confirmed: boolean) => {
                setOpen(false)
                setState({ message: '', type: 'alert', variant: 'success', })
                resolve(confirmed)
            }

            onCloseFn.current = () => {
                setOpen(false)
                setState({ message: '', type: 'alert', variant: 'success', })
                resolve(false)
            }

            setState({
                message,
                type: "confirm",
                variant: 'info'
            })
            setOpen(true)
        })
    }, [])

    const alert = useCallback((message: string, variant: 'success' | 'info' | 'danger' | 'warning') => {
        return new Promise<void>((resolve) => {
            onOkFn.current = () => {
                setState({ message: '', type: 'alert', variant: 'info' })
                setOpen(false)
                resolve()
            }

            onCloseFn.current = () => {
                setOpen(false)
                setState({ message: '', type: 'alert', variant: 'success', })
                resolve()
            }

            setState({
                type: 'alert',
                message: message,
                variant: variant,
            })
            setOpen(true)
        })
    }, [])

    return (
        <PopupContext.Provider value={{ confirm, alert }}>
            {children}
            <PopupComponent
                {...state}
                open={open}
                onOk={onOkFn.current ?? (() => { })}
                onConfirm={onConfirmFn.current ?? (async (confirmed: boolean) => { return confirmed })}
                onClose={onCloseFn.current ?? (() => { })}
            />
        </PopupContext.Provider>
    )
}

export function usePopup() {
    const context = useContext(PopupContext)
    if (context === undefined) {
        throw new Error('usePopup must be used within a PopupProvider')
    }
    return context
}

export default function PopupComponent({ open, message, type, variant, onConfirm, onOk, onClose }: PopupComponentProps) {
    return (
        <>
            {open &&
                <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.5)] fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <button onClick={onClose} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <i className="i-mdi-close text-2xl " />
                                <span className="sr-only">Close</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                {variant == 'success' && <i className="text-6xl text-green-400 i-lucide-check-circle-2" />}
                                {variant == 'info' && <i className="text-6xl text-blue-300 i-lucide-alert-circle" />}
                                {variant == 'danger' && <i className="text-6xl text-red-500 i-lucide-alert-triangle" />}
                                {variant == 'warning' && <i className="text-6xl text-yellow-500 i-lucide-alert-triangle" />}

                                <h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
                                {type == 'confirm' &&
                                    <>
                                        < button onClick={() => onConfirm(true)} type="button" className="text-white bg-secondary-base hover:bg-secondary-800 focus:ring-4 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm inline-flex items-center px-8 py-2.5 text-center me-2">
                                            {translate('Yes')}
                                        </button>
                                        <button onClick={() => onConfirm(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-8 py-2.5 hover:text-gray-900 focus:z-10">
                                            {translate('No')}
                                        </button>
                                    </>
                                }

                                {type == 'alert' &&
                                    <PrimaryButton onClick={() => onOk()}>
                                       {translate('Ok')}
                                    </PrimaryButton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
