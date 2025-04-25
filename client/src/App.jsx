import { Outlet } from "react-router-dom";

function App() {

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
    <Outlet context={{logout}} />
  );
}

export default App;
