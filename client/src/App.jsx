import { useState } from 'react'
import { useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import usuLogo from './assets/Utah_State_Aggies_logo.svg';
import openInFull from './assets/open-in-full.svg';
import locationIcon from './assets/location.svg';
import './App.css'
import { Nav } from './Nav.jsx'

function App() {
  const [count, setCount] = useState(0)

  // async function logout() {
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


      <div className='logo-container'>
        <img src={usuLogo} className="logo" alt="USU Bull logo" />
      </div>
      <h1>Venue Ops</h1>
      <div className="check-in-out-button">
        <button>
          Check Out
        </button>
      </div>

      <h2>At Work:</h2>

      <div id='at-work-container'>
        <div className="card">
          <div className='expand-btn'>
            <img src={openInFull} alt="Click to expand card" />
          </div>
          <p className='card-title'>
            <span className='status-dot-active'></span>
            Adam Westenskow
          </p>
          <p className='card-details'>
            <span className='location-icon-container'>
              <img className='location-icon' src={locationIcon} alt="Location Icon" />
            </span>
            Spectrum Office
          </p>
        </div>
        <div className="card">
          <div className='expand-btn'>
            <img src={openInFull} alt="Click to expand card" />
          </div>
          <p className='card-title'>
            <span className='status-dot-active'></span>
            Ethan McAllister
          </p>
          <p className='card-details'>
            <span className='location-icon-container'>
              <img className='location-icon' src={locationIcon} alt="Location Icon" />
            </span>
            West Stadium
          </p>
        </div>
        <div className="card">
          <div className='expand-btn'>
            <img src={openInFull} alt="Click to expand card" />
          </div>
          <p className='card-title'>
            <span className='status-dot-active'></span>
            Josh Prichard
          </p>
          <p className='card-details'>
            <span className='location-icon-container'>
              <img className='location-icon' src={locationIcon} alt="Location Icon" />
            </span>
            West Stadium
          </p>
        </div>
      </div>

      <h2>Away From Work:</h2>

      <div id='at-work-container'>
        <div className="card">
           <p className='card-title'>
            <span className='status-dot-inactive'></span>
            Benjamin McCuloch
          </p>         
        </div>
        <div className="card">
           <p className='card-title'>
            <span className='status-dot-inactive'></span>
            Jedd Freidli 
          </p>         
        </div>
        <div className="card">
           <p className='card-title'>
            <span className='status-dot-inactive'></span>
            Payton Hanni
          </p>         
        </div>
      </div>

      <footer>
        Copyright: Ethan McAllister
      </footer>
      

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      {/* </div> */}

      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <button onClick={logout}>Logout</button> */}
    </>
  )
}

export default App;
