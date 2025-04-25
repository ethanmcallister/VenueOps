import { Nav } from './Nav.jsx'
import { EmployeeCard } from './EmployeeCard.jsx'
import { useOutletContext } from 'react-router-dom';
import './App.css'

export function Employee() {
  const { logout } = useOutletContext();

  return (
    <>
      <div>
        <Nav logout={logout} otherPage="/events" />
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
      <div className="check-in-out-button">
        <button>
          Check Out
        </button>
      </div>

      <h2>At Work:</h2>
      <div id='at-work-container'>
        <EmployeeCard name='Adam Westenskow' status='active' location='Spectrum Office' showDetails={true}/>
        <EmployeeCard name='Ethan McAllister' status='active' location='West Stadium' showDetails={true}/>
        <EmployeeCard name='Josh Prichard' status='active' location='West Stadium' showDetails={true}/>
      </div>

      <h2>Away From Work:</h2>
      <div id='at-work-container'>
        <EmployeeCard name='Benjamin McCulloch' status='inactive' location='home' showDetails={false}/>
        <EmployeeCard name='Jedd Freidli' status='inactive' location='home' showDetails={false}/>
        <EmployeeCard name='Payton Hanni' status='inactive' location='home' showDetails={false}/>
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
