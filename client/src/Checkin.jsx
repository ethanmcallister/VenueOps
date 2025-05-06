import { Nav } from "./Nav.jsx";
import { useOutletContext } from "react-router-dom";
import * as cookie from "cookie";

import { useNavigate } from "react-router-dom";

export function Checkin() {
    const { logout } = useOutletContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // Access form input values
        const form = e.target;
        const check_in_time = form.check_in_time.value;
        const check_out_time = form.check_out_time.value;
        const location = form.location.value;
        const tasks = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(
            (checkbox) => checkbox.name
        );

        console.log({ check_in_time, check_out_time, location, tasks });
        console.log(cookie.parse(document.cookie).csrftoken);

        const res = await fetch('/api/check_in', {
            method: 'POST',
            credentials: 'same-origin', // include cookies!

            body: JSON.stringify({
                check_in_time,
                check_out_time,
                location,
                tasks,
            }),

            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
            }
        })

        navigate('/');
    }

    return (
        <>
            <Nav otherPage="/" logout={logout} />
            <h1>Check In</h1>

            <form onSubmit={handleSubmit} method="post" id="checkin-form">
                <div className="form-div">
                    <label>
                    Start Time:
                        <input type="time" name="check_in_time" className="checkin-input"/>
                    </label>
                </div>
                <div className="form-div">
                    <label>
                    End Time:
                        <input type="time" name="check_out_time" className="checkin-input"/>
                    </label>
                </div>
                <div className="form-div">
                    <label>
                    Location:
                        <select name="location" id="location" className="checkin-input">
                            <option value="West Stadium">West Stadium Center</option>
                            <option value="Stadium Concourse">Stadium Concourse</option>
                            <option value="Spectrum">Spectrum</option>
                            <option value="Spectrum Office">Spectrum Office</option>
                            <option value="Softball Field">Softball Field</option>
                            <option value="Soccer Field">Soccer Field</option>
                            <option value="Track">Track</option>
                        </select>
                    </label>
                </div>
                <div id="tasks" className="form-div">
                    <h4>Tasks to be Completed:</h4>
                    <label className="task-item"><input type="checkbox" name="restrooms"/>Restroom Care</label>
                    <label className="task-item"><input type="checkbox" name="detailing"/>Detailing</label>
                    <label className="task-item"><input type="checkbox" name="floors"/>Floor Care</label>
                    <label className="task-item"><input type="checkbox" name="windows"/>Window Cleaning</label>
                    <label className="task-item"><input type="checkbox" name="event-setup-cleanup"/>Event Setup/Cleanup</label>
                    <label className="task-item"><input type="checkbox" name="vacuuming"/>Vacuuming</label>
                </div>
                <button id="checkin-button">Check In</button>
            </form>

            <footer>
                Copyright: Ethan McAllister
            </footer>
        </>
    )
}
