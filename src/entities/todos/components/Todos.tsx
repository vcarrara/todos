import { AnimatePresence } from 'framer-motion'
import { useTodosQuery } from '../queries'
import Todo from './Todo'

function Todos() {
    const { data: todos } = useTodosQuery()

    return (
        <ul className="space-y-2 min-h-[100px]">
            <AnimatePresence initial={false}>
                {todos?.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </AnimatePresence>
        </ul>
    )
}

export default Todos
