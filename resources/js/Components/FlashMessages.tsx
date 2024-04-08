import { Flash } from "@/types"
import { useEffect, useState } from "react"

export default function FlashMessages({ messages }: { messages: Flash }) {
    const [flash, setFlash] = useState(messages)

    useEffect(() => {
        setFlash(messages)
    }, [messages])

    return (
        <div className='fixed bottom-0 right-0 pointer-events-none p-4 space-y-2'>
            {flash.success &&
                <div id='flash_success' className='relative bg-white px-4 py-2 rounded-lg w-[350px] pointer-events-auto fade-out shadow-lg'>
                    <button className='absolute right-2 top-3' onClick={() => setFlash({ ...flash, success: undefined })}>
                        <i className='i-lucide-x' />
                    </button>
                    <h2 className='font-bold'>Successo</h2>
                    <span className='text-green-800'>{flash.success}</span>
                </div>
            }
            {flash.error &&
                <div id='flash_error' className='relative bg-white px-4 py-2 rounded-lg w-[350px] pointer-events-auto fade-out shadow-lg'>
                    <button className='absolute right-2 top-3' onClick={() => setFlash({ ...flash, error: undefined })}>
                        <i className='i-lucide-x' />
                    </button>
                    <h2 className='font-bold'>Oops!</h2>
                    <span className='text-red-800'>{flash.error}</span>
                </div>
            }
            {flash.warning &&
                <div id='flash_warning' className='relative bg-white px-4 py-2 rounded-lg w-[350px] pointer-events-auto fade-out shadow-lg'>
                    <button className='absolute right-2 top-3' onClick={() => setFlash({ ...flash, warning: undefined })}>
                        <i className='i-lucide-x' />
                    </button>
                    <h2 className='font-bold'>Aviso</h2>
                    <span className='text-yellow-800'>{flash.warning}</span>
                </div>
            }
        </div>
    )
}
