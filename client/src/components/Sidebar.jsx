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
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const links = {
    dash: '/',
    adn: '/admin-page',
    sign: '/auth/signup',
    mem: '/sanggunian-members',
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
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
          <Accordion data={sidebarAccordion} collapse={collapsed} />
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
        { auth && auth.role === role.spr || auth.role === role.adn && (
          <Link
          className={`Sidebar__Button ${
            isActive(links.sign) ? 'active' : ''
          }`}
          to={links.mem}
        >
          <FontAwesomeIcon icon={icons.user} />
          {!collapsed && <p>Sanggunian Members</p>}
        </Link>
        )}
      </div>
    </div>
  ) : null;
};

export default Sidebar;
