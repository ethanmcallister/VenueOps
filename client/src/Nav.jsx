import React from "react";
import { Link } from "react-router-dom";
import usuLogo from './assets/Utah_State_Aggies_logo.svg';

export function Nav(props) {
    const otherPageName = props.otherPage === "/" ? "Employee" : "Events";

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={props.otherPage} className="navLink">{otherPageName}</Link>
                        {/* <a className="navLink">Events</a> */}
                    </li>
                    <li>
                        <a className="navLink" onClick={props.logout}>Logout</a>
                    </li>
                </ul>
            </nav>

            <div className='logo-container'>
                <img src={usuLogo} className="logo" alt="USU Bull logo" />
            </div>
        </>
    );
}
