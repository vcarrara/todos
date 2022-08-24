import { TrashIcon } from '@heroicons/react/outline'
import { PencilIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useDeleteTodoMutation, useToggleTodoMutation } from '../queries'
import { ITodo } from '../types/todo.interface'

type TodoProps = {
    todo: ITodo
}

function Todo({ todo }: TodoProps) {
    const { mutate: toggleTodo } = useToggleTodoMutation()
    const { mutate: deleteTodo } = useDeleteTodoMutation()

    const [text, setText] = useState(todo.content)
    const [isEditing, setIsEditing] = useState(false)

    // Ref to focus the input on pencil click
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Whenever the todo is in "edition" mode, we focus the input automatically
    useEffect(() => {
        if (isEditing) inputRef.current?.focus()
    }, [isEditing])

    return (
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
                    onClick={() => toggleTodo(todo.id)}
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
                    <button
                        onClick={() => setIsEditing(true)}
                        className={classNames(
                            isEditing ? 'bg-white/40 visible' : 'invisible',
                            'hover:bg-white/40 group-hover:visible rounded-lg px-3 py-2 h-full'
                        )}
                    >
                        <PencilIcon className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <button onClick={() => deleteTodo(todo.id)} className="hover:bg-white/40 invisible group-hover:visible rounded-lg px-3 py-2 h-full">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todo
