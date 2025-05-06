import { Nav } from "./Nav.jsx";
import { useOutletContext } from "react-router-dom";

export function Checkin() {
    const { logout } = useOutletContext();

    return (
        <>
            <Nav otherPage="/" logout={logout} />
            <h1>Check In</h1>

            <form action="/api/check_in/" method="post" id="checkin-form">
                <div className="form-div">
                    <label>
                    Start Time:
                        <input type="time" name="start_time" className="checkin-input"/>
                    </label>
                </div>
                <div className="form-div">
                    <label>
                    End Time:
                        <input type="time" name="end_time" className="checkin-input"/>
                    </label>
                </div>
                <div className="form-div">
                    <label>
                    Location:
                        <select name="location" id="location" className="checkin-input">
                            <option value="wsc">West Stadium Center</option>
                            <option value="stadium-concourse">Stadium Concourse</option>
                            <option value="spectrum">Spectrum</option>
                            <option value="spectrum">Spectrum Office</option>
                            <option value="softball">Softball Field</option>
                            <option value="soccer">Soccer Field</option>
                            <option value="soccer">Track</option>
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
