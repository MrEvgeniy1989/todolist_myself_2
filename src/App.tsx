import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const addTask = (titleForNewTask: string) => {
        setTasks([{id: v1(), title: titleForNewTask, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDoneNewStatus: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDoneNewStatus} : t))
    }


    return (
        <Todolist
            title={'What to learn'}
            tasks={tasks}
            filter={filter}
            changeFilter={changeFilter}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
        />
    );
}

export default App;
