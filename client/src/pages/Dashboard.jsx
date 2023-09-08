import useAuth from "../hooks/useAuth";
import Users from "../components/Users"
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
        ? <Users />
        : auth && auth?.role === role.spr
        ? <UserProfile />
        : null
      }
    </div>
  )
};

export default Dashboard