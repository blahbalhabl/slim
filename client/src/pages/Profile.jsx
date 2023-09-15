import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons'
import { BASE_URL } from '../api/axios'
import Modal from '../components/Modal';
import Loader from "../components/Loader";

import '../styles/Profile.css'

const UserProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const [inputs, setInputs] = useState({
    oldpass: "",
    newpass: "",
    confirm: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
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

  const handleChangePass = async (e) => {
    e.preventDefault();
    const passData = {
      oldpass: inputs.oldpass,
      newpass: inputs.newpass,
      confirm: inputs.confirm,
    }
    try {
      const res = await axiosPrivate.post('/change-password', passData, {
        headers: {"Content-Type": "application/json"}
      })
      if (res.status === 200) {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
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
        <h1>User Profile:</h1>
        <p>User ID: {user.id}</p>
        <p>User Name: {user.name}</p> 
        <p>User Role: {user.role}</p> 
        <button onClick={openModal}>Change Password</button>
        <Modal 
          isOpen={isModalOpen}
          closeModal={closeModal}
        >
          <div className="Profile__Modal">
            <form>
              <label htmlFor="oldpass">Old Password</label>
              <input
                className="Profile__Input"
                type="password"
                name="oldpass"
                id="oldpass"
                onChange={handleChange}
                value={inputs.oldpass}
              />
              <label htmlFor="newpass">New Password</label>
              <input
                className="Profile__Input"
                type="password"
                name="newpass"
                id="newpass"
                onChange={handleChange}
                value={inputs.newpass}
              />
              <label htmlFor="confirm">Confirm Password</label>
              <input
                className="Profile__Input"
                type="password"
                name="confirm"
                id="confirm"
                onChange={handleChange}
                value={inputs.confirm}
              />
              <button onClick={handleChangePass}>Change Password</button>
            </form>
          </div>
        </Modal>
      </div>
    ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserProfile;