import { v4 as uuid } from 'uuid'
import { ITodo } from '../entities/todos/types/todo.interface'
import remove from 'lodash/remove'

let todos: ITodo[] = [
    {
        id: '1',
        content: 'Embêter Noah',
        done: true,
    },
    {
        id: '2',
        content: 'Casser Olympe',
        done: true,
    },
    {
        id: '3',
        content: 'Faire les courses',
        done: false,
    },
]

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}

function delay<T>(t = 200, val?: T) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val)
        }, t)
    })
}

export const getTodos = async () => {
    await delay()
    return todos
}

export const addTodo = async (content: string) => {
    await delay()
    const todo: ITodo = {
        id: uuid(),
        done: false,
        content,
    }
    todos.push(todo)
    return todo
}

export const removeTodo = async (id: string) => {
    await delay()
    if (getRandomInt(4) === 0) {
        return Promise.reject()
    }
    const removed = remove(todos, (todo) => todo.id === id)
    return removed
}

export const toggleTodo = async (id: string) => {
    await delay()
    if (getRandomInt(4) === 0) {
        return Promise.reject()
    }
    todos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    return todos
}
