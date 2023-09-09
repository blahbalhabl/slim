import useAuth from "../hooks/useAuth";
import Admin from "../components/Admin"
import UserProfile from "./Profile";
import { roles } from "../utils/userRoles";
import '../styles/Dashboard.css'

const Dashboard = () => {
  const { auth } = useAuth();
  const role = roles.role;
  const level = roles.level;

  return (
    <div className="Dashboard">
      <p>Dashboard</p>
      { auth && auth?.role === role.adn 
        ? <Admin />
        : auth && auth?.role === role.spr
        ? <UserProfile />
        : null
      }
    </div>
  )
};

export default Dashboard