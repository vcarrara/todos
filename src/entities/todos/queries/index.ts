import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTodo, getTodos, removeTodo, toggleTodo } from '../../../api'
import { useToastsStore } from '../../toasts/store/toasts.store'
import { ITodo } from '../types/todo.interface'

export const useTodosQuery = () => useQuery(['todos'], getTodos)

export const useAddTodoMutation = () => {
    const { addSuccess } = useToastsStore()
    const queryClient = useQueryClient()

    return useMutation((content: string) => addTodo(content), {
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
            addSuccess('Todo correctement ajoutée.')
        },
    })
}

export const useDeleteTodoMutation = () => {
    const { addSuccess, addError } = useToastsStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => removeTodo(id), {
        // When the request is successful
        onSuccess: () => {
            addSuccess('Todo correctement supprimée.')
        },
        // When mutate is called
        onMutate: async (id) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['todos'])

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData<ITodo[]>(['todos'])

            if (previousTodos) {
                // Optimistically update to the new value
                queryClient.setQueryData<ITodo[]>(['todos'], (old) => old?.filter((todo) => todo.id !== id))
            }

            // Return a context object with the snapshotted value
            return { previousTodos }
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, _newTodo, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData<ITodo[]>(['todos'], context.previousTodos)
            }
            addError("Simulation d'une erreur serveur")
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(['todos'])
        },
    })
}

export const useToggleTodoMutation = () => {
    const { addSuccess, addError } = useToastsStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => toggleTodo(id), {
        // When the request is successful
        onSuccess: () => {
            addSuccess('Todo correctement modifiée.')
        },
        // When mutate is called
        onMutate: async (id) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['todos'])

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData<ITodo[]>(['todos'])

            if (previousTodos) {
                // Optimistically update to the new value
                queryClient.setQueryData<ITodo[]>(['todos'], (old) => old?.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
            }

            // Return a context object with the snapshotted value
            return { previousTodos }
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, _newTodo, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData<ITodo[]>(['todos'], context.previousTodos)
            }
            addError("Simulation d'une erreur serveur")
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(['todos'])
        },
    })
}
