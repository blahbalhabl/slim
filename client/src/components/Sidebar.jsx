import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import Accordion from './Accordion';
import { sidebarAccordion } from '../utils/sidebarAccordion';
import { roles } from '../utils/userRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../utils/Icons';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const links = {
    dash: '/',
    adn: '/admin-page',
    sign: '/auth/signup',
    ran: '/random-page',
  };

  const [collapsed, setCollapsed] = useState(false); // State to track sidebar collapse

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  const isActive = (links) => location.pathname === links;

  const role = roles.role;
  const level = roles.level;

  return auth ? (
    <div className={`Sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className='Sidebar__Top'>
        <FontAwesomeIcon
          className='Sidebar__Burger'
          onClick={toggleSidebar}
          icon={icons.burger}
        />
      </div>
      <div className="Sidebar__Buttons">
        <Link
          className={`Sidebar__Button ${isActive(links.dash) ? 'active' : ''}`}
          to={links.dash}
        >
          <FontAwesomeIcon icon={icons.chart} />
          {!collapsed && <p>Dashboard</p>}
        </Link>
        {auth && auth.role === role.adn && (
          <>
            { !collapsed && <Accordion data={sidebarAccordion} /> }
            <Link
              className={`Sidebar__Button ${
                isActive(links.adn) ? 'active' : ''
              }`}
              to={links.adn}
            >
              <FontAwesomeIcon icon={icons.lock} />
              {!collapsed && <p>Admin Page</p>}
            </Link>
          </>
        )}
        {auth && auth.role === role.spr && (
          <Link
            className={`Sidebar__Button ${
              isActive(links.sign) ? 'active' : ''
            }`}
            to={links.sign}
          >
            <FontAwesomeIcon icon={icons.user} />
            {!collapsed && <p>Users</p>}
          </Link>
        )}
        <Link
          className={`Sidebar__Button ${isActive(links.ran) ? 'active' : ''}`}
          to={links.ran}
        >
          <FontAwesomeIcon icon={icons.file} />
          {!collapsed && <p>Random Page</p>}
        </Link>
      </div>
    </div>
  ) : null;
};

export default Sidebar;
