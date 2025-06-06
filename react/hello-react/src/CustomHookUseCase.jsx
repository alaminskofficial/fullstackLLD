import React from 'react';
import useFetch from './js/useFetchAlamin';

const CustomHookUseCase = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CustomHookUseCase;