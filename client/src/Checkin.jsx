import { Nav } from "./Nav.jsx";
import { useOutletContext } from "react-router-dom";

export function Checkin() {
    const { logout } = useOutletContext();

    return (
        <>
            <Nav otherPage="/" logout={logout} />
            <h1>Checkin</h1>

            <form action="/api/check_in/" method="post">
               {/* stuff here  */}
            </form>
        </>
    )
}
