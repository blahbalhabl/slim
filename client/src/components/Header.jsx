import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Header.css";
import { useEffect } from "react";

const Header = () => {
  const { user, userLogout } = useAuth();

  return (
    <div className="Header">
      <h3>SLIM</h3>
      <div className="Header__Links">
        {user ? (
          <>
            <button onClick={userLogout}>LOGOUT</button>
            <Link to="/">DASHBOARD</Link>
          </>
        ) : (
          <>
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">SIGNUP</Link>
          </>
        )}

        {user && (
          <p>
            Hello {user.name}, {user.role}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
