import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons'
import { BASE_URL } from '../api/axios'
import Modal from '../components/Modal';
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

import '../styles/Profile.css'

const UserProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth()
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [inputs, setInputs] = useState({
    oldpass: "",
    newpass: "",
    confirm: "",
  });
  const [visible, setVisible] = useState(false);
  const inputType = visible ? "text" : "password";
  const toggleIcon = visible ? <FontAwesomeIcon icon={icons.eye} /> : <FontAwesomeIcon icon={icons.eyeslash} />;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sendRequest = async () => {
    try {
      const res = await axiosPrivate.get('/user');
      const data = res.data
      setIsChecked(data.is2faOn)
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

  const handleCheckboxChange = async () => {
    try {
      const is2faOn = !isChecked;

      // Send an API request to update the user's data
      const res = await axiosPrivate.put('/update-2fa', { is2faOn }, {
        headers: {'Content-Type': 'application/json'}
      });
      if (res.status === 200) {
        console.log('User data updated successfully.');
        setIsChecked(is2faOn); // Update the state locally
      } else {
        console.error('Failed to update user data.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
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

  

  const handleAvatarUpdate = () => {
    setIsButtonVisible(true);
  };
  
  const handleAvatarLeave = () => {
    setIsButtonVisible(false);
  };

  useEffect(() => {
    sendRequest()
    .then((data) => {
      setUser(data);
    })
  },[])

  useEffect(() => {
    if (auth) {
      // Fetch the image using Axios when auth data is available
      axiosPrivate
        .get(`/uploads/images/${auth.avatar}`, {
          responseType: 'arraybuffer', // Specify the response type as arraybuffer
        })
        .then((response) => {
          const base64Image = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          const dataURL = `data:${response.headers['content-type']};base64,${base64Image}`;
          setImageSrc(dataURL);
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
    }
  }, [auth]);
  
  return (
    <div className="Profile">
      { user ? (
      <div className="Profile__Container">
        <div className="Profile__Card">
          <div className="Profile__Avatar" onMouseEnter={handleAvatarUpdate}
            onMouseLeave={handleAvatarLeave}>
            {user.avatar ? (
              <>
                <img src={imageSrc} />
              </>
            ) : (
              <FontAwesomeIcon icon={icons.user} />
            )}
            {isButtonVisible && 
                <div className="Profile__Avatar__Change">
                  <label htmlFor="avatar-input">Upload Avatar</label>
                  <input 
                    // hidden
                    type="file" 
                    name="avatar-input" 
                    id="avatar-input" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <button onClick={handleUpload}>Upload</button>
                </div>
                }
          </div>
          <div className="Profile__Information">
            <h2>{user.name}</h2>
            <p>{user.role}</p>
          </div>
        </div>
        <div className="Profile__Card__Right">
              <h2>Security</h2>
              <button onClick={openModal}>Change Password</button>
              <label htmlFor="otp-on">Use Google Authenticator
              <input
                type='checkbox'
                checked={isChecked}
                id="otp-on"
                onChange={handleCheckboxChange}
              />
              </label>
        </div>
        <Modal 
          isOpen={isModalOpen}
          closeModal={closeModal}
        >
          <div className="Profile__Modal">
            <form>
              <label htmlFor="oldpass">Old Password</label>
              <input
                className="Profile__Input"
                type={inputType}
                name="oldpass"
                id="oldpass"
                onChange={handleChange}
                value={inputs.oldpass}
              />
              <label htmlFor="newpass">New Password</label>
              <input
                className="Profile__Input"
                type={inputType}
                name="newpass"
                id="newpass"
                onChange={handleChange}
                value={inputs.newpass}
              />
              <label htmlFor="confirm">Confirm Password</label>
              <input
                className="Profile__Input"
                type={inputType}
                name="confirm"
                id="confirm"
                onChange={handleChange}
                value={inputs.confirm}
              />
              <span
                className="Profile__Password__Toggle"
                onClick={() => setVisible(visible => !visible)}>
                  {toggleIcon}
              </span>
              <button
                className="Profile__Modal__Button"
                onClick={handleChangePass}>
                  Change Password
              </button>
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