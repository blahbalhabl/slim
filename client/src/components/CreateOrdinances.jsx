import Modal from './Modal';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import '../styles/CreateOrdinances.css'

const CreateOrdinances = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [inputs, setInputs] = useState({
    number: "",
    series: "",
    title: "",
  });
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('number', inputs.number);
      formData.append('series', inputs.series);
      formData.append('title', inputs.title);
      formData.append('status', 'draft');
      formData.append('level', auth.level);
      formData.append('file', file);
      await axiosPrivate.post('/upload/ordinance/draft?type=ordinances', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="CreateOrdinances">
      <button onClick={openModal}>Create New Ordinance</button>
      <Modal 
        isOpen={isModalOpen} 
        closeModal={closeModal}
      >
        <div className='CreateOrdinances__Container'>
            <form onSubmit={handleSubmit}>
              <div className='CreateOrdinances__Title'>
                <label htmlFor="ordinance-number">Number:</label>
                <input 
                  className='CreateOrdinances__Input'
                  type="number"
                  name='number'
                  id='ordinance-number'
                  onChange={handleChange}
                />
                <label htmlFor="ordinance-series">Series:</label>
                <input 
                  className='CreateOrdinances__Input'
                  type="number"
                  name='series'
                  id='ordinance-number'
                  onChange={handleChange}
                />
                <label htmlFor="ordinance-title">Title:</label>
                <input 
                  className='CreateOrdinances__Input'
                  type="text"
                  name='title'
                  id='ordinance-title'
                  onChange={handleChange}
                />
                <label htmlFor="ordinance-status">Status:</label>
                <input 
                  className='CreateOrdinances__Input'
                  type="text"
                  name='ordinance-status'
                  id='ordinance-status'
                  value={'draft'}
                  readOnly
                />
                <label htmlFor="ordinance-level">Level:</label>
                <input 
                  className='CreateOrdinances__Input'
                  type="text"
                  name='ordinance-level'
                  id='ordinance-level'
                  value={auth.level}
                  readOnly
                />
              </div>
              <div className="CreateOrdinances__Content">
              <label htmlFor="file">File:</label>
                <input 
                  className='CreateOrdinances__Input'
                  type="file"
                  name='file'
                  id='file'
                  onChange={handleFileChange} 
                />
              </div>
              <button type='submit'>Submit</button>
            </form>
        </div>
      </Modal>
    </div>
  )
}

export default CreateOrdinances