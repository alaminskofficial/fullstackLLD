import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar></Navbar>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          increment counter
        </button>
        <p>count is : {count} </p>
        <button onClick={() => setCount(count - 1)}>
          decrement counter
        </button>
      
      </div>
      <p className="read-the-docs">
        Alamin Please Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
