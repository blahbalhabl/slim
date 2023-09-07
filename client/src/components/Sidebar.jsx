import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Accordion from './Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartSimple,
  faLock,
  faFile,
  faPencil } from '@fortawesome/free-solid-svg-icons'
import '../styles/Sidebar.css'

const Sidebar = () => {
  const { auth } = useAuth();

  const sidebarAccordion = [
    {
      title: 'Records',
      contents: [
        {
          title:  <Link
                    className='Sidebar__Button'
                    to={'/records/ordinances'}>
                      <FontAwesomeIcon icon={faPencil} />
                      <p>List of Ordinances</p>
                  </Link>
        },
        {
          title:  <Link
                    className='Sidebar__Button'
                    to={'/records/ordinances/enacted'}>
                      <FontAwesomeIcon icon={faPencil} />
                      <p>List of Enacted Ordinances</p>
                  </Link>
        }
      ]
    },
  ];

  return auth ? (
    <div className='Sidebar'>
      <p>Sidebar</p>
      <div className="Sidebar__Buttons">
        <Link
          className='Sidebar__Button'
          to='/'
          > 
            <FontAwesomeIcon icon={faChartSimple} /> 
            <p>Dashboard</p>
        </Link>
        { auth && auth.role === 'admin' && (
        <>
          <Accordion data={sidebarAccordion}/>
          <Link
            className='Sidebar__Button'
            to='/admin-page' 
            > 
            <FontAwesomeIcon icon={faLock} />
              <p>Admin Page</p>
          </Link>
        </>
        )}
        <Link
          className='Sidebar__Button'
          to='/random-page'
          > 
            <FontAwesomeIcon icon={faFile} />
            <p>Random Page</p> 
        </Link>
      </div>
    </div>
  ) : null;
};

export default Sidebar