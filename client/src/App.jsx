import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import usuBull from './assets/usu_bull.png'
import usuLogo from './assets/Utah_State_Aggies_logo.svg';
import viteLogo from '/vite.svg'
import './App.css'
import { Nav } from './Nav.jsx'

function App() {
  const [count, setCount] = useState(0)

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
      console.log("Logout successful!");
    } else {
      // handle logout failed!
      console.log("Logout failed!");
    }
  }

  return (
    <>
      <div>
        <Nav logout={logout} />
      </div>
      {/* <div> */}
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Venue Ops</h1>
      <div>
        {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        <img src={usuLogo} className="logo" alt="USU Bull logo" />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <button onClick={logout}>Logout</button> */}
    </>
  )
}

export default App;
