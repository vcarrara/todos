import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuid } from 'uuid'
import { IToast } from '../types/toast.interface'

type ToastsStore = {
    toasts: IToast[]
    addSuccess: (content: string) => void
    addError: (content: string) => void
    close: (id: string) => void
}

export const useToastsStore = create<ToastsStore>()(
    immer((set) => ({
        toasts: [],
        addSuccess: (content) =>
            set((state) => {
                state.toasts.push({ id: uuid(), type: 'success', content })
            }),
        addError: (content) =>
            set((state) => {
                state.toasts.push({ id: uuid(), type: 'error', content })
            }),
        close: (id) =>
            set((state) => {
                state.toasts = state.toasts.filter((toast) => toast.id !== id)
            }),
    }))
)
