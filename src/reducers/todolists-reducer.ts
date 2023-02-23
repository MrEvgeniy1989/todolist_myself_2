import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';

type ActionType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>

export const TodolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: v1(), title: action.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, title: action.newTitle}
                : todolist)
        case 'CHANGE-FILTER':
            return state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, filter: action.filterNewValue}
                : todolist)
        default:
            return [...state]
    }
}

export const addTodolistAC = (newTitle: string) => {
    return {type: `ADD-TODOLIST`, newTitle} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: `REMOVE-TODOLIST`, todolistId} as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {type: `CHANGE-TODOLIST-TITLE`, todolistId, newTitle} as const
}
export const changeFilterAC = (todolistId: string, filterNewValue: FilterType) => {
    return {type: `CHANGE-FILTER`, todolistId, filterNewValue} as const
}