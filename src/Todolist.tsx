import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskStateType, TaskType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';

type TodolistPropsType = {
    todolistId: string
    tasks: TaskType[]
    filter: FilterType
    addTask: (todolistId: string, titleForNewTask: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDoneNewStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    todolistTitle: string
    changeFilter: (todolistId: string, filterNewValue: FilterType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onAllChangeFilter = () => props.changeFilter(props.todolistId, 'all')
    const onActiveChangeFilter = () => props.changeFilter(props.todolistId, 'active')
    const onCompletedChangeFilter = () => props.changeFilter(props.todolistId, 'completed')

    const addTaskHandler = (newTitle: string) => {
      props.addTask(props.todolistId, newTitle)
    }

    const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistId)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
      props.changeTodolistTitle(props.todolistId, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.todolistTitle} callback={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan title={t.title} callback={changeTaskTitleHandler}/>
                        <button onClick={removeTaskHandler}>X</button>
                    </li>
                })}
            </ul>
            <div>
                <button
                    onClick={onAllChangeFilter}
                    className={props.filter === 'all' ? 'active-filter' : ''}
                >All</button>
                <button
                    onClick={onActiveChangeFilter}
                    className={props.filter === 'active' ? 'active-filter' : ''}
                >Active</button>
                <button
                    onClick={onCompletedChangeFilter}
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                >Completed</button>
            </div>
        </div>
    )
}