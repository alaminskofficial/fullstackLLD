import React from 'react';
import useFetch from './js/useFetchAlamin';

const CustomHookUseCase = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Todo Data:</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      { data.map((todo, index) => <p key={index}>{todo.title}</p>)}
    </div>
  );
};

export default CustomHookUseCase;