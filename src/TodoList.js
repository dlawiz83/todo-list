import React, { useState } from 'react';
import './TodoList.css'; 

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [dateTimeValue, setDateTimeValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() === '' || dateTimeValue === '') return; 
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            dateTime: dateTimeValue,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
        setDateTimeValue(''); 
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    
    const sortedTodos = [...todos].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new todo"
                />
                <input
                    type="datetime-local"  
                    value={dateTimeValue}
                    onChange={(e) => setDateTimeValue(e.target.value)}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {sortedTodos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <span>{todo.text}</span>
                        <span className="todo-date">{new Date(todo.dateTime).toLocaleString()}</span>
                        <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;