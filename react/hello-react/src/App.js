import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CustomHookUsecase from './CustomHookUseCase'

import Navbar from './Nav';
import Counter from './Counter' // Import the new Counter component


function App() {
  const [count, setCount] = useState(0) //hook -usestate
  return (
    <div className="App">
      <Navbar></Navbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World ! Alamin</p>
        <CustomHookUsecase/>
        <div className="card">
        {/* passing props to child component */}
        <Counter count={count} setCount={setCount} /> 
        </div><br/>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
      </header>
    </div>
  );
}

export default App;
