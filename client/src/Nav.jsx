import React from "react";

export function Nav(props) {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <a className="navLink">Events</a>
                    </li>
                    <li>
                        <a className="navLink" onClick={props.logout}>Logout</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
