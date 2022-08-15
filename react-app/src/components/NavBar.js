import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const { leagueId } = useParams();

  return (
    sessionUser ?
      <div className='navbar-outer'>
        <nav className='navbar-container'>
          <div className='navbar-left'>

            <div className='home-logo'>
              <NavLink to='/' exact={true} activeClassName='active'>
                <img className='website-logo' src='https://esrf.s3.amazonaws.com/Website-Logo.PNG' alt='website logo esrf' />
              </NavLink>
            </div>

            {leagueId && (
              <div className='league-home-link'>
                <NavLink to={`/leagues/${leagueId}`}>League Home</NavLink>
              </div>
            )}

          </div>

          <div className='navbar-right'>

            <div className='about-link'>
              <NavLink to='/about'>About</NavLink>
            </div>

            <div>
              <LogoutButton />
            </div>

          </div>
        </nav>
      </div>
      :
      null
  );
}

export default NavBar;
