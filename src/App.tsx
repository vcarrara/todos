import { PlusIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'
import Toasts from './entities/toasts/components/Toasts'
import Todos from './entities/todos/components/Todos'
import { useAddTodoMutation } from './entities/todos/queries'

function App() {
    const { mutate: addTodo } = useAddTodoMutation()

    return (
        <main className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen">
            <div className="flex items-center justify-center relative h-full">
                <div className="p-6 w-1/2 min-h-1/4 backdrop-blur-sm bg-white/30 shadow-xl rounded-3xl relative">
                    <Todos />
                    <div className="absolute left-0 flex justify-center w-full">
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addTodo('A faire...')}
                            className="shadow-xl -bottom-6 w-12 h-12 bg-emerald-400 hover:bg-emerald-500 rounded-full inline-flex items-center justify-center"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </motion.button>
                    </div>
                </div>

                <ul className="absolute right-8 bottom-8 space-y-4">
                    <Toasts />
                </ul>
            </div>
        </main>
    )
}

export default App
