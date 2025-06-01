import React from 'react';

function Counter({ count, setCount }) { //props 
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      <p>Count is: {count}</p>
      <button onClick={() => setCount(count - 1)}>
        Decrement counter
      </button>
    </div>
  );
}

export default Counter;