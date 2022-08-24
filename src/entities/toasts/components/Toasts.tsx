import { motion, AnimatePresence } from 'framer-motion'
import { useToastsStore } from '../store/toasts.store'
import Toast from './Toast'

function Toasts() {
    const { toasts } = useToastsStore()

    return (
        <AnimatePresence initial={false}>
            {toasts.map((toast) => (
                <motion.li
                    layout
                    className="w-72"
                    key={toast.id}
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                    <Toast toast={toast} />
                </motion.li>
            ))}
        </AnimatePresence>
    )
}

export default Toasts
