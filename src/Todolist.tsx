import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType, TaskType} from './App';


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    changeFilter: (filterValue: FilterValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (titleForNewTask: string) => void
    changeTaskStatus: (taskId: string, isDoneNewStatus: boolean) => void
}


export const Todolist: FC<TodolistPropsType> = (props) => {
    const [titleForNewTask, setTitleForNewTask] = useState<string>('')
    const [error, setError] = useState<null | string>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleForNewTask(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (titleForNewTask.trim() !== '') {
            props.addTask(titleForNewTask.trim())
        } else {
            setError('Название обязательно!')
        }
        setTitleForNewTask('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        className={error ? 'error' : ''}
                        value={titleForNewTask}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map(t => {
                        const removeTaskHandler = () => props.removeTask(t.id)
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatus}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                    <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
                    <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
                </div>
            </div>
        </div>
    )
}