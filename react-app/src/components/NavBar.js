import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    sessionUser ?
      <div className='navbar-outer'>
        <nav className='navbar-container'>
          <div className='home-logo'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src='https://esrf.s3.amazonaws.com/Website-Logo.PNG' alt='website logo esrf' />
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </nav>
      </div>
      :
      null
  );
}

export default NavBar;
