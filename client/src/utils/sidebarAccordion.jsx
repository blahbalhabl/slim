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
];