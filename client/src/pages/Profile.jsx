import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { auth } = useAuth();
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {auth.id}</p>
      <p>User Name: {auth.name}</p> 
      <p>User Role: {auth.role}</p> 
    </div>
  );
};

export default UserProfile;