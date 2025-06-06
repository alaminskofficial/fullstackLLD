import React, { useState, useContext, useRef, useEffect } from 'react';
import './App.css';
import { TodoContext } from './components/TodoContext'

function App() {
  const { todos, addTodo, deleteTodo, toggleComplete, todoCount } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className='App'>
      <h2>📋 Todo App</h2>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
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
      <footer className="footer">Powered by Sk Alamin</footer>
    </div>
  );
}

export default App;