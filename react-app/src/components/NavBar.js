import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import downCaret from '../images/down-caret.png';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const leagueState = useSelector(state => state.leagues)

  const currentLocation = useLocation();
  const { leagueId } = useParams();

  const league = leagueState[leagueId];

  const [teamsList, setTeamsList] = useState(false);
  const [teamNumber, setTeamNumber] = useState('');
  const [userTeam, setUserTeam] = useState(false);
  const [showOpposing, setShowOpposing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [teamActive, setTeamActive] = useState(false);
  const [leagueActive, setLeagueActive] = useState(false);
  const [playerActive, setPlayerActive] = useState(false);

  useEffect(() => {
    if (league) {
      setTeamsList(league.teams)

      let found = false;

      for (let team of league.teams) {
        if (team.team_owner_id === sessionUser.id) {
          setTeamNumber(team.team_number);
          setUserTeam(true);
          found = true;
          break;
        }
      }

      if (!found) {
        setTeamNumber('');
        setUserTeam(false);
      }

      if ((found && teamsList.length > 1) || (!found && teamsList.length > 0)) {
        setShowOpposing(true);
      }

    }

    setLoaded(true);
  }, [league, sessionUser.id, teamsList.length])

  useEffect(() => {
    switch (currentLocation.pathname) {
      case `/leagues/${leagueId}`:
      case `/leagues/${leagueId}/settings`:
      case `/leagues/${leagueId}/members`:
        setLeagueActive(true);
        setTeamActive(false);
        setPlayerActive(false);
        break;
      case `/leagues/${leagueId}/players`:
      case `/leagues/${leagueId}/players/edit/new`:
      case `/leagues/${leagueId}/players/edit/stats`:
        setLeagueActive(false);
        setTeamActive(false);
        setPlayerActive(true);
        break;
      case `/leagues/${leagueId}/teams/${teamNumber}`:
      case `/leagues/${leagueId}/teams/${teamNumber}/settings`:
        setLeagueActive(false);
        setTeamActive(true);
        setPlayerActive(false);
        break;
      default:
        setLeagueActive(false);
        setTeamActive(false);
        setPlayerActive(false);
        break;
    }
  }, [leagueId, teamNumber, currentLocation])


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

            {loaded && league && (
              <>
                {userTeam &&
                  <NavLink className={teamActive ? 'league-links-team active-link-team' : 'league-links-team'} to={`/leagues/${leagueId}/teams/${teamNumber}`} exact={true}>
                    <span className='link-text'>
                      My Team
                    </span>
                    <div className='transition'></div>
                  </NavLink>
                }

                <div className={!userTeam ? 'league-links-border' : ''}>
                  <NavLink className={leagueActive ? 'league-links-league active-link-league' : 'league-links-league'} to={`/leagues/${leagueId}`} exact={true}>
                    <span className='link-text'>
                      League
                    </span>
                    <div className='down-caret-box'>
                      <img className='down-caret' src={downCaret} alt='down caret' />
                    </div>
                  </NavLink>
                  <div className='league-dropdown'>
                    <ul>
                      <li className='dropdown-item'>
                        <Link className='dropdown-link' to={`/leagues/${leagueId}`}>League Home</Link>
                      </li>
                      <li className='dropdown-item'>
                        <Link className='dropdown-link' to={`/leagues/${leagueId}/settings`}>Settings</Link>
                      </li>
                      <li className='dropdown-item'>
                        <Link className='dropdown-link' to={`/leagues/${leagueId}/members`}>Members</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <NavLink className={playerActive ? 'league-links-player active-link-player' : 'league-links-player'} to={`/leagues/${leagueId}/players`} exact={true}>
                    <span className='link-text'>
                      Players
                    </span>
                    <div className='down-caret-box'>
                      <img className='down-caret' src={downCaret} alt='down caret' />
                    </div>
                  </NavLink>
                  <div className='player-dropdown'>
                    <ul>
                      <li className='dropdown-item'>
                        <Link className='dropdown-link' to={`/leagues/${leagueId}/players`}>Add Players</Link>
                      </li>
                      {sessionUser.id === league.owner_id && (
                        <>
                          <li className='dropdown-item'>
                            <Link className='dropdown-link' to={`/leagues/${leagueId}/players/new`}>Create Player</Link>
                          </li>
                          <li className='dropdown-item'>
                            <Link className='dropdown-link' to={`/leagues/${leagueId}/players/edit/stats`}>Player Stat Sheet</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {showOpposing &&
                  <div>
                    <div className='league-links-opposing'>
                      <span className='link-text'>
                        Opposing Teams
                      </span>
                      <div className='down-caret-box'>
                        <img className='down-caret' src={downCaret} alt='down caret' />
                      </div>
                    </div>
                    <div className='opposing-dropdown'>
                      <ul className='teams-list-dropdown'>
                        {teamsList.map(team =>
                          team.team_owner_id !== sessionUser.id &&
                          <li key={team.id} className='dropdown-item-team'>
                            <Link className='dropdown-link-team' to={`/leagues/${leagueId}/teams/${team.team_number}`}>
                              <div className='opposing-teams-box'>
                                <div className='opposing-teams-image-box'>
                                  <div className='opposing-logos-box'>
                                    <img className='opposing-teams-logo' src={team.team_image} alt='team logo' />
                                  </div>
                                </div>
                                <div className='opposing-teams-info'>
                                  <div className='opposing-teams-name-abre'>
                                    <div className='opposing-teams-name'>{team.team_name}</div>
                                    <span className='opposing-teams-abre'>({team.team_abre})</span>
                                  </div>
                                  <div className='opposing-teams-user'>{team.team_owner.username}</div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                }
              </>
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
