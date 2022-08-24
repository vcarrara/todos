import { motion, AnimatePresence } from 'framer-motion'
import { useTodosQuery } from '../queries'
import Todo from './Todo'

function Todos() {
    const { data: todos } = useTodosQuery()

    return (
        <ul className="space-y-2 min-h-[100px]">
            <AnimatePresence initial={false}>
                {todos?.map((todo) => (
                    <motion.li
                        layout
                        key={todo.id}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    >
                        <Todo todo={todo} />
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}

export default Todos
