import useAuth from "../hooks/useAuth";
import Admin from "../components/Admin"
import UserProfile from "./Profile";
import Calendar from "../components/Calendar";
import { roles } from "../utils/userRoles";
import '../styles/Dashboard.css'

const Dashboard = () => {
  const { auth } = useAuth();
  const role = roles.role;
  const level = roles.level;

  return (
    <div className="Dashboard">
      <div className="Dashboard__Header">
        <div className="Dashboard__Info">
          {auth && (
            <p>Welcome back, {auth.name}, {auth.role.toLowerCase()}</p>
          )}
        </div>

          { auth && auth?.role === role.adn 
            ? <Admin />
            : auth && auth?.role === role.spr
            ? <Admin />
            : null
          }

      </div>
      {/* <Calendar /> */}
    </div>
  )
};

export default Dashboard