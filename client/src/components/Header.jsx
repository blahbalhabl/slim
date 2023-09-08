import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import Tooltip from "./Tooltip";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const signOut = async () => {
    await logout();
    navigate('/login');
  }

  const headerTooltip = [
    {
      buttons: [
        <button 
          key="profile" 
          onClick={() => {
            navigate(`/profile/${auth.id}`)
        }}>
          Profile
        </button>,
        <button key="logout" onClick={signOut}>
          Logout
        </button>,
      ],
    },
  ]

  return (
    <div className="Header">
      <h3>SLIM: Sanggunian Legislative Information Management</h3>
      <div className="Header__Container">
        {auth && (
          <div className="Header__Info">
            <p>
              Hello {auth.name}, {auth.role}
            </p>
            <div>
              <Tooltip data={headerTooltip}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
