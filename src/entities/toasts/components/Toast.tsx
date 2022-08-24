import { CheckCircleIcon, ExclamationCircleIcon, XIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { useToastsStore } from '../store/toasts.store'
import { IToast } from '../types/toast.interface'

type ToastProps = {
    toast: IToast
    dismissAfter?: number
}

function Toast({ toast, dismissAfter = 5000 }: ToastProps) {
    const { close } = useToastsStore()

    useEffect(() => {
        setTimeout(() => close(toast.id), dismissAfter)
    }, [close, toast.id, dismissAfter])

    return (
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end z-50">
            <div className="max-w-sm w-full bg-white shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                    <div className="flex items-start">
                        {toast.type === 'success' && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
                        {toast.type === 'error' && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
                        <div className="ml-3 w-0 flex-1">
                            <p className="mt-1 text-sm text-gray-500">{toast.content}</p>
                        </div>
                        <div className="ml-4 shrink-0 flex">
                            <button
                                onClick={() => close(toast.id)}
                                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                            >
                                <span className="sr-only">Close</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast
