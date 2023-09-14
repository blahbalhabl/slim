import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons'
import { BASE_URL } from '../api/axios'

import '../styles/Profile.css'

const UserProfile = () => {
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
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

  const handleAvatarChange = (e) => {
    const photo = e.target.files[0];
    setAvatar(photo);
  };

  const formData = new FormData();
  const handleUpload = () => {
    formData.append('avatar', avatar);
    uploadAvatar();
  };

  const uploadAvatar = async () => {
    try {
      // Upload the new avatar
      await axiosPrivate.post('/avatar-upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })

      // Delete the previous avatar if it exists
      if (user.avatar) {
        await axiosPrivate.delete(`/delete-avatar/${user.avatar}`);
      }
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