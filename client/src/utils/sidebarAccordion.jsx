import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from './Icons';

export const sidebarAccordion = [
  {
    title: 'Reports',
    contents: [
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/draft'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Draft Ordinances</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/enacted'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Enacted Ordinances</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/enacted/category'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Enacted Ordinances by Category</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/approved'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Approved Ordinances</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/approved/category'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Approved Ordinances by Category</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/amended'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Amended Ordinances</p>
                </Link>
      },
      {
        title:  <Link
                  className='Sidebar__Button'
                  to={'/records/ordinances/vetoed'}>
                    <FontAwesomeIcon icon={icons.pencil} />
                    <p>List of Enacted Ordinances</p>
                </Link>
      },
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