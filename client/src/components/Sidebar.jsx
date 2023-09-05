import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {

  const { auth } = useAuth();

  return auth ? (
    <div className='Sidebar'>
      <p>Sidebar</p>
      <div className="Sidebar__Buttons">
        <Link
        className='Sidebar__Button'
        to='/'
        > <p>Dashboard</p> </Link>
        { auth && auth.role === 'admin' && (
        <Link
          className='Sidebar__Button'
          to='/admin'
          > <p>Admin Page</p> </Link>)}
        <Link
        className='Sidebar__Button'
        to='/random'
        > <p>Random Page</p> </Link>
        <div className="Sidebar__Button"></div>
      </div>
    </div>
  ) : null;
};

export default Sidebar