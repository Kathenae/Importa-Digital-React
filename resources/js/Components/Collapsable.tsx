import { cn } from "@/utils";
import { Transition } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";

interface CollapsableProps extends PropsWithChildren {
    title: string,
}

export default function Collapsable({ children, title }: CollapsableProps) {
    const [open, setOpen] = useState(true);
    return (
        <div>
            <button
                type="button"
                className="mb-4 flex items-center space-x-1" onClick={() => setOpen(!open)}
            >
                <i className={cn("icon-[mdi--chevron-down] text-2xl transition", open ? 'rotate-0' : '-rotate-90')} />
                <h1 className="text-xl font-bold">{title}</h1>
            </button>
            <Transition
                show={open}
                className="pl-6"
                enter="transition ease-in duration-300 transform origin-top"
                enterFrom="opacity-0 scale-y-0"
                enterTo="opacity-100 scale-y-100"
                leave="transition ease-out duration-300 transform origin-top"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-0"
            >
                <div className="space-y-4">
                    {children}
                </div>
            </Transition>
        </div>
    )
}
