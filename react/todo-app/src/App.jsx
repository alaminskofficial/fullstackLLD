import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './App.css';

function App() {
   // Initialize state variable 'todos' with a default value of []
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  //inputRef is commonly used to directly interact with or modify DOM elements
  const inputRef = useRef(null);

// useEffect to focus the input field on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

// useCallback to memoize the addTodo function
  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      {/* Update state using setTodos function */}
      setTodos([...todos, { id : Date.now() , text: inputValue, completed: false }]);
      setInputValue('');
    }
  }, [inputValue, todos]);

  const deleteTodo = useCallback((index) => {
    setTodos(todos.filter((_, i) => i !== index));
  }, [todos]);

  const toggleComplete = useCallback((index) => {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));
  }, [todos]);

// useMemo to compute the number of todos
  const todoCount = useMemo(() => todos.length, [todos]);

  return (
    <div className='App'>
      <h2>Todo App</h2>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <p>You have {todoCount} todos</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(index)} />
            <span>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;