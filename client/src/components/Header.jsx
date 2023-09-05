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
      <h3>SLIM: Sanggunian Legislative Information Management</h3>
      <div className="Header__Info">
        {auth ? (
          <>
            <p>
              Hello {auth.name}, {auth.role}
            </p>
            <button onClick={signOut}>LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/login">LOGIN</Link>
            <span> | </span>
            <Link to="/signup">SIGNUP</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
