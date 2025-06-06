import React, { createContext, useState, useCallback, useMemo } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([
    { id: Date.now(), text: 'Todo app design', completed: true },
    { id: Date.now() + 1, text: 'Todo app coding done', completed: true },
    { id: Date.now() + 2, text: 'Deploy and testing', completed: false }
  ]);

  const addTodo = useCallback((inputValue) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text: inputValue, completed: false }]);
  }, []);

  const deleteTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  const toggleComplete = useCallback((index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo))
    );
  }, []);

  const todoCount = useMemo(() => todos.length, [todos]);

  return (
    <TodoContext.Provider value={{ todos, todoCount ,addTodo, deleteTodo, toggleComplete}}>
      {props.children}
    </TodoContext.Provider>
  );
};