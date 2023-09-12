import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons'
import { BASE_URL } from '../api/axios'

import '../styles/Profile.css'

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
  };
  const formData = new FormData();
  const handleAvatarChange = (e) => {
    e.preventDefault();
    formData.append('avatar', e.target.files[0])
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadAvatar();
  };

  const uploadAvatar = async () => {
    try {
      await axiosPrivate.post('/avatar-upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest()
    .then((data) => {
      setUser(data);
    })
  },[])
  
  return (
    <div>
      { user ? (
      <div className="Profile">
        <div className="Profile__Avatar">
          { user.avatar ? <img src={`${BASE_URL}/uploads/images/${user.avatar}`}/> : <FontAwesomeIcon icon={icons.user} />}
        </div>
        <label htmlFor="avatar-input">Upload Avatar
          <input 
            hidden
            type="file" 
            name="avatar-input" 
            id="avatar-input" 
            accept="image/*"
            onChange={handleAvatarChange} 
          />
          <button onClick={handleUpload}>Update Avatar</button>
        </label>
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