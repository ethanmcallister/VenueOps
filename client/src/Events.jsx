import { Nav } from "./Nav.jsx";
import { useOutletContext } from "react-router-dom";

export function Events() {
    const { logout } = useOutletContext();

    return (
        <>
            <Nav otherPage="/" logout={logout} />
            <h1>Events</h1>
            <p>This is a test to see if a long string of text will fix an issue.</p>
        </>
    );
}
