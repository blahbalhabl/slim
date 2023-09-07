import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Accordion from './Accordion';
import { sidebarAccordion } from '../utils/sidebarAccordion';
import { roles } from '../utils/userRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons';
import '../styles/Sidebar.css'

const Sidebar = () => {
  const { auth } = useAuth();
  const role = roles.role;
  const level = roles.level;

  return auth ? (
    <div className='Sidebar'>
      <p>Sidebar</p>
      <div className="Sidebar__Buttons">
        <Link
          className='Sidebar__Button'
          to='/'
          > 
            <FontAwesomeIcon icon={icons.chart} /> 
            <p>Dashboard</p>
        </Link>
        { auth && auth.role === role.adn && (
        <>
          <Accordion data={sidebarAccordion} />
          <Link
            className='Sidebar__Button'
            to='/admin-page' 
            > 
            <FontAwesomeIcon icon={icons.lock} />
              <p>Admin Page</p>
          </Link>
        </>
        )}
        <Link
          className='Sidebar__Button'
          to='/auth/signup'
          > 
            <FontAwesomeIcon icon={icons.user} />
            <p>Users</p> 
        </Link>
        <Link
          className='Sidebar__Button'
          to='/random-page'
          > 
            <FontAwesomeIcon icon={icons.file} />
            <p>Random Page</p> 
        </Link>
      </div>
    </div>
  ) : null;
};

export default Sidebar