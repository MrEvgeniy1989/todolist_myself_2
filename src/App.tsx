import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false}
    ])

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
            />
        </div>
    );
}

export default App;
