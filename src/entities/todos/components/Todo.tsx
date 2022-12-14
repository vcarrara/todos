import { TrashIcon } from '@heroicons/react/outline'
import { PencilIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useDeleteTodoMutation, useToggleTodoMutation } from '../queries'
import { ITodo } from '../types/todo.interface'

type TodoProps = {
    todo: ITodo
}

const button = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.95 },
}

function Todo({ todo }: TodoProps) {
    const { mutate: toggleTodo } = useToggleTodoMutation()
    const { mutate: deleteTodo } = useDeleteTodoMutation()

    const [text, setText] = useState(todo.content)
    const [isEditing, setIsEditing] = useState(false)

    // Ref to focus the input on pencil click
    const inputRef = useRef<HTMLInputElement | null>(null)

    const controls = useAnimation()

    async function handleDragEnd(info: PanInfo, id: string) {
        const offset = info.offset.x
        const velocity = info.velocity.x

        if (offset < -100 || velocity < -500) {
            deleteTodo(id)
        } else {
            controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } })
        }
    }

    const isDragging = useRef(false)

    // Whenever the todo is in "edition" mode, we focus the input automatically
    useEffect(() => {
        if (isEditing) inputRef.current?.focus()
    }, [isEditing])

    return (
        <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            style={{
                overflow: 'visible',
                willChange: 'transform',
                cursor: 'grab',
            }}
            whileTap={{ cursor: 'grabbing' }}
            layout
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        >
            <motion.div
                drag="x"
                dragDirectionLock
                onDragStart={() => {
                    isDragging.current = true
                }}
                onDragEnd={(_, info) => {
                    handleDragEnd(info, todo.id)
                    setTimeout(() => {
                        isDragging.current = false
                    }, 150)
                }}
                animate={controls}
            >
                <div className="inline-flex w-full justify-between space-x-2 group">
                    <div className="flex items-center px-2">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                            className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 rounded"
                        />
                    </div>
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setIsEditing(false)
                                }
                            }}
                            className={classNames(
                                todo.done && 'line-through',
                                'focus:ring-0 border-none focus:outline-none focus:shadow-none text-left w-full px-4 py-2 bg-transparent rounded-lg hover:bg-white/40'
                            )}
                        />
                    ) : (
                        <button
                            onClick={() => !isDragging.current && toggleTodo(todo.id)}
                            className={classNames(
                                todo.done && 'line-through',
                                'focus:ring-0 border-none focus:outline-none focus:shadow-none text-left w-full px-4 py-2 bg-transparent rounded-lg hover:bg-white/40'
                            )}
                        >
                            {text}
                        </button>
                    )}
                    <div className="inline-flex space-x-1">
                        <div>
                            <motion.button
                                variants={button}
                                whileHover="hover"
                                whileTap="pressed"
                                onClick={() => !isDragging.current && setIsEditing(true)}
                                className={classNames(
                                    isEditing ? 'bg-white/40 visible' : 'invisible',
                                    'hover:bg-white/40 group-hover:visible rounded-lg px-3 py-2 h-full'
                                )}
                            >
                                <PencilIcon className="w-4 h-4" />
                            </motion.button>
                        </div>
                        <div>
                            <motion.button
                                variants={button}
                                whileHover="hover"
                                whileTap="pressed"
                                onClick={() => !isDragging.current && deleteTodo(todo.id)}
                                className="hover:bg-white/40 invisible group-hover:visible rounded-lg px-3 py-2 h-full"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.li>
    )
}

export default Todo
