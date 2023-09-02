import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Header.css'

const Header = () => {
    const {user, userLogout} = useContext(AuthContext);

  return (
    <div className='Header'>
        <h3>SLIM</h3>
        <div className="Header__Links">
            <Link to='/'>DASHBOARD</Link>
            {user ? (
                <button onClick={userLogout}>LOGOUT</button>
            ) : (
            <> 
                <Link to='/login'>LOGIN</Link>
                <Link to='/signup'>SIGNUP</Link>
            </>)}
            
            {user && <p>Hello {user.name}, {user.role}</p>}
        </div>
    </div>
  )
}

export default Header