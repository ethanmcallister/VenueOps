import { useEffect, useState } from 'react'
import { Nav } from './Nav.jsx'
import { EmployeeCard } from './EmployeeCard.jsx'
import { Link, useOutletContext } from 'react-router-dom';
import * as cookie from 'cookie';

import { useNavigate } from "react-router-dom";

import './App.css'

export function Employee() {
  const [employee, setEmployee] = useState(null);
  const [allEmployees, setAllEmployees] = useState(null);
  const [userCheckIn, setUserCheckIn] = useState(null);
  const { logout } = useOutletContext();
  const navigate = useNavigate();

  const handleCheckin = () => {
    navigate('/employee/checkin');
  }

  const handleCheckout = async () => {
    const res = await fetch('/api/check_out', {
      method: 'POST',
      credentials: 'same-origin', // include cookies!
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
      }
    });

    if (res.ok) {
      await fetchLoggedInUser();
      await fetchAllUsers();
    } else {
      console.error('Error checking out');
    }
  }

  async function fetchLoggedInUser() {
    const res = await fetch('/api/me', {
      credentials: 'same-origin', // include cookies!
    });
    const body = await res.json();
    console.log(body.user)
    console.log(body.checkin)

    setEmployee(body.user);
    setUserCheckIn(body.checkin);
  }

  async function fetchAllUsers() {
    const res = await fetch('/api/all_employees', {
      credentials: 'same-origin', // include cookies!
    });

    const body = await res.json();
    console.log(body)

    setAllEmployees(body.employees);
  }

  useEffect(() => {
    fetchLoggedInUser();
    fetchAllUsers();
  }
  , []);

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
      
      {employee && <p>Hello, {employee.first_name}</p>}
      {employee && employee.is_checked_in && <h4>Status: <span style={{ color: 'green'}}>Checked in to work</span></h4>}
      {employee && !employee.is_checked_in && <h4>Status: <span style={{ color: 'red' }}>Away from work</span></h4>}

      <div className="main-button">
        <button onClick={handleCheckin}>
          Check In 
        </button>
      </div>

      {
      userCheckIn && 
      <div className="main-button">
        <button style={{backgroundColor: 'red'}} onClick={handleCheckout}>
          Check Out 
        </button>
      </div>
      }

      <h2>At Work:</h2>
      <ul id='at-work-container'>
        {allEmployees && allEmployees
          .filter((employee) => employee.is_checked_in) // Filter users who are checked in
          .map((employee) => (
            <EmployeeCard key={employee.id} name={employee.first_name + ' ' + employee.last_name} status='active' location={employee.checkin.location} showDetails={true}/>
          ))}
      </ul>

      <h2>Away From Work:</h2>
      <ul id='at-work-container'>
        {allEmployees && allEmployees
          .filter((employee) => !employee.is_checked_in) // Filter users who are not checked in
          .map((employee) => (
            <EmployeeCard key={employee.id} name={employee.first_name + ' ' + employee.last_name} status='inactive' location="" showDetails={false}/>
          ))}
      </ul>

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
