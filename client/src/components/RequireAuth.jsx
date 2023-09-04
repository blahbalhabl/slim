import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Check if the user has any of the allowed roles
  const hasAllowedRole = allowedRoles?.includes(user?.role);
  console.log(hasAllowedRole)
  return (
    hasAllowedRole
      ? <Outlet/>
      : user
        ? <Navigate to='/unauthorized' state={{from: location}} replace />
        : <Navigate to='/login' state={{from: location}} replace />
  )
}

export default RequireAuth;
