import useAuth from '../hooks/useAuth'
import { Link, useLocation } from 'react-router-dom'
import Accordion from './Accordion';
import { sidebarAccordion } from '../utils/sidebarAccordion';
import { roles } from '../utils/userRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../utils/Icons';
import '../styles/Sidebar.css'

const Sidebar = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const links = {
    dash: '/',
    adn: '/admin-page',
    sign: '/auth/signup',
    ran: '/random-page',
  };

  const isActive = (links) => location.pathname === links;

  const role = roles.role;
  const level = roles.level;

  return auth ? (
    <div className='Sidebar'>
      <p>Sidebar</p>
      <div className="Sidebar__Buttons">
        <Link
          className={`Sidebar__Button ${isActive(links.dash) ? 'active' : ''}`}
          to={links.dash}
          > 
            <FontAwesomeIcon icon={icons.chart} /> 
            <p>Dashboard</p>
        </Link>
        { auth && auth.role === role.adn && (
        <>
          <Accordion data={sidebarAccordion} />
          <Link
            className={`Sidebar__Button ${isActive(links.adn) ? 'active' : ''}`}
            to={links.adn} 
            > 
            <FontAwesomeIcon icon={icons.lock} />
              <p>Admin Page</p>
          </Link>
        </>
        )}
        {auth && auth.role === role.spr && (
          <Link
            className={`Sidebar__Button ${isActive(links.sign) ? 'active' : ''}`}
            to={links.sign} 
            > 
              <FontAwesomeIcon icon={icons.user} />
              <p>Users</p> 
          </Link>
        )}
        <Link
          className={`Sidebar__Button ${isActive(links.ran) ? 'active' : ''}`}
          to={links.ran} 
          > 
            <FontAwesomeIcon icon={icons.file} />
            <p>Random Page</p> 
        </Link>
      </div>
    </div>
  ) : null;
};

export default Sidebar