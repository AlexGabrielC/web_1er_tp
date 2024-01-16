import React, {useState} from 'react';
import './App.css';

let nextId = 0;

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function addTask(task) {
        setTasks([...tasks,{id: nextId++,task: task,done : false}]);
    }

    function delTask(taskID) {
        setTasks(tasks.filter(t => t.id !== taskID));
    }

    function changeTask(newTask) {
        setTasks(tasks.map(t => {
            if(t.id === newTask.id){
                return newTask;
            }
            return t;
        }))
    }

    return(
        <>
            <h1>Listes des taches à effectuer</h1>
            <input
                placeholder='ajouter une tache'
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
            />
            <button onClick={()=> {
                setNewTask('');
                addTask(newTask);
            }}>Ajouter</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                         <input
                            type="checkbox"
                            checked={task.done}
                            onChange={e => {changeTask({...task,done: e.target.checked});}}
                        />
                        {isEditing && 
                        <>
                            <input
                                value={task.title}
                                onChange={e => {changeTask({...task,task: e.target.value});}} 
                            />
                            <button onClick={() => setIsEditing(false)}>
                                Save
                            </button>
                        </>
                        } 
                        { !isEditing &&
                            <>
                                {task.task}
                                <button onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                            </>
                        }
                        <button onClick={() => {
                            delTask(task.id)
                        }}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

