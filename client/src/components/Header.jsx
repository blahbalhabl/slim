import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const signOut = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <div className="Header">
      <h3>SLIM</h3>
      <div className="Header__Links">
        {auth ? (
          <>
            <button onClick={signOut}>LOGOUT</button>
            <span> | </span>
            <Link to="/">DASHBOARD</Link>
          </>
        ) : (
          <>
            <Link to="/login">LOGIN</Link>
            <span> | </span>
            <Link to="/signup">SIGNUP</Link>
          </>
        )}
        <span> | </span>
        {auth && auth.role === 'admin' && (
          <Link to="/admin">ADMIN PAGE</Link>
        )}

        {auth && (
          <p>
            Hello {auth.name}, {auth.role}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
