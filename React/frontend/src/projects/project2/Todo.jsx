import React, { useState } from 'react';

function Todo() {
    const [tasks, setTasks] = useState([
        {
            key: 0,
            data: {
                status: "Active",
                desc: "To do task 1",
                created: "12/8/2025"
            }
        }
    ]);
    const [newKey, setNewKey] = useState(1);

    const addTask = (desc) => {
        const newTask = {
            key: newKey,
            data: {
                status: "Active",
                desc,
                created: new Date().toLocaleDateString()
            }
        };
        setTasks([...tasks, newTask]);
        setNewKey(newKey + 1);
    };

    function taskDone(key) {
        setTasks(tasks.map(task =>
            task.key === key
                ? { ...task, data: { ...task.data, status: "Completed" } }
                : task
        ));
    }

    return (
        <>
            <AddTask onAdd={addTask} />
            {tasks.map(task => (
                <div key={task.key}>
                    <Task
                        status={task.data.status}
                        desc={task.data.desc}
                        created={task.data.created}
                    />
                    {task.data.status.toLowerCase() === "active" ? (
                        <button onClick={() => taskDone(task.key)}>Completed</button>
                    ) : (
                        <p className="text-red-500">Complete</p>
                    )}
                </div>
            ))}
        </>
    );
}

function AddTask({ onAdd }) {
    const [desc, setDesc] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (desc.trim() === "") return;
        onAdd(desc);
        setDesc("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter task description"
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

function Task({ status, desc, created }) {
    return (
        <div>
            <h2>{desc}</h2>
            <div>
                <p><i>{created}</i></p>
                <b style={{ color: status.toLowerCase() === "active" ? "green" : "red" }}>
                    {status}
                </b>
            </div>
        </div>
    );
}

export default Todo;
