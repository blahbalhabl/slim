import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserProfile = () => {
  const [user, setUser] = useState();
  const axiosPrivate = useAxiosPrivate();

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get('/user');
      const data = res.data
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    sendRequest()
    .then((data) => {
      setUser(data);
    })
  },[])
  
  return (
    <div>
      { user? (
      <div>
        <h1>User Profile: By Requesting to Server API</h1>
        <p>User ID: {user.id}</p>
        <p>User Name: {user.name}</p> 
        <p>User Role: {user.role}</p> 
      </div>
    ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;