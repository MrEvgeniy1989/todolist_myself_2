import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filterNewValue: FilterType) => {
      setFilter(filterNewValue)
    }
    const removeTask = (taskId: string) => {
      setTasks(tasks.filter(t => t.id !== taskId))
    }
    const addTask = (titleForNewTask: string) => {
      const newTask = {id: v1(), title: titleForNewTask, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDoneNewStatus: boolean) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDoneNewStatus} : t))
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
