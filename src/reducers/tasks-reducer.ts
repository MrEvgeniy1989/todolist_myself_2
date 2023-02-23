import {FilterType, TaskStateType} from '../App';
import {v1} from 'uuid';

type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>

export const TasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.titleForNewTask, isDone: false}
            state[action.todolistId] = [newTask, ...state[action.todolistId]]
            return {...state}
        case 'REMOVE-TASK':
            state[action.todolistId] = state[action.todolistId].filter(task => task.id !== action.taskId)
            return {...state}
        case 'CHANGE-TASK-STATUS':
            state[action.todolistId] = state[action.todolistId].map(task => task.id === action.taskId
                ? {...task, isDone: action.isDoneNewStatus}
                : task)
            return {...state}
        case 'CHANGE-TASK-TITLE':
            state[action.todolistId] = state[action.todolistId].map(task => task.id === action.taskId
                ? {...task, title: action.newTitle}
                : task)
            return {...state}
        default:
            return {...state}
    }
}

export const addTaskAC = (todolistId: string, titleForNewTask: string) => {
    return {type: `ADD-TASK`, todolistId, titleForNewTask} as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: `REMOVE-TASK`, todolistId, taskId} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDoneNewStatus: boolean) => {
    return {type: `CHANGE-TASK-STATUS`, todolistId, taskId, isDoneNewStatus} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: `CHANGE-TASK-TITLE`, todolistId, taskId, newTitle} as const
}
