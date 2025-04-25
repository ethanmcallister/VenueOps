import { Nav } from "./Nav.jsx";
import { useOutletContext } from "react-router-dom";

export function Events() {
    const { logout } = useOutletContext();

    return (
        <>
            <Nav otherPage="/" logout={logout} />
            <h1>Events</h1>

            <div className="main-button">
                <button>
                    Add Event
                </button>
            </div>

            <p>No events to show.</p>
        </>
    );
}
