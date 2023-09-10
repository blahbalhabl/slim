import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import Tooltip from "./Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons'
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
        <li
          className="Header__Tooltip"
          key="profile" 
          onClick={() => {
            navigate(`/profile/${auth.id}`)
        }}>
          <FontAwesomeIcon className="Header__Tooltip__Icon" icon={icons.user} />
          Profile
        </li>,
        <li
          className="Header__Tooltip"
          key="logout" 
          onClick={signOut}>
            <FontAwesomeIcon className="Header__Tooltip__Icon" icon={icons.logout} />
          Logout
        </li>,
      ],
    },
  ]

  return (
    <div className="Header">
      <h3>SLIM: Sanggunian Legislative Information Management</h3>
      <div className="Header__Container">
        {auth && (
          <div className="Header__Info">
            <div className="Header__Avatar">
            <FontAwesomeIcon icon={icons.user} />
            </div>
            <p>
              {auth.name}
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
