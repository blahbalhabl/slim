import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from './Icons';

export const sidebarAccordion = [
  {
    title: 'Records',
    contents: [
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Ordinances</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/enacted'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Enacted Ordinances</p>
                </Link>
      }
    ]
  },
  {
    title: 'Calendar',
    contents: [
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/announcements'}>
                    <FontAwesomeIcon icon={icons.horn} />
                    <p>Announcements</p>
                </Link>
      },
    ]
  },
  {
    title: 'Requests',
    contents: [
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/requests'}>
                    <FontAwesomeIcon icon={icons.horn} />
                    <p>Requests</p>
                </Link>
      },
    ]
  },
];