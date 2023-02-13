import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (filterNewValue: FilterType) => void
    removeTask: (taskId: string) => void
    addTask: (titleForNewTask: string) => void
    changeTaskStatus: (taskId: string, isDoneNewStatus: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const onAllChangeFilter = () => props.changeFilter('all')
    const onActiveChangeFilter = () => props.changeFilter('active')
    const onCompletedChangeFilter = () => props.changeFilter('completed')

    const titleCurrentTargetHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
        } else {
            setError('Название обязательно!')
        }
        setTitle('')
    }
    const onKeyDownHandlerTitleCurrentTarget = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={titleCurrentTargetHandler}
                    onKeyDown={onKeyDownHandlerTitleCurrentTarget}
                />
                <button
                    onClick={addTaskHandler}
                >+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{t.title}</span>
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