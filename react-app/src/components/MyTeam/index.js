import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import { getSingleTeam } from "../../store/team";
import PlayerModal from "../PlayerModal";
import Loading from "../Loading";
import settingsIcon from '../../images/settings-icon.png';
import './MyTeam.css';

const MyTeam = ({ sessionUser }) => {
    const { leagueId, teamNumber } = useParams();
    const dispatch = useDispatch();
    const teamState = useSelector(state => state.teams);
    const leagueState = useSelector(state => state.leagues);
    const league = leagueState[leagueId];
    const team = teamState[teamNumber];

    let max = 0;
    let currentLeader;

    for (let team in league?.teams) {
        if (team.fantasy_total > max) {
            max = team.fantasy_total;
            currentLeader = team;
        }
    }

    const [playerList, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            const teamResponse = await dispatch(getSingleTeam(leagueId, teamNumber))
            await dispatch(getSingleLeague(leagueId))

            setPlayerList(teamResponse.players)
            setLoading(true);
        }

        fetchData();

    }, [dispatch, leagueId, teamNumber])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {loading ?
                    <>
                        <div className='my-team-title-accent'></div>
                        <div className='my-team-title-box'>
                            <div className='my-team-info-box'>
                                <div className='my-team-info-logo'>
                                    <div className='my-team-logo-box'>
                                        <img className='my-team-logo' src={team.team_image} alt='team logo' />
                                    </div>
                                </div>
                                <div className='my-team-info'>
                                    <span className='my-team-header-box'>
                                        <span className='my-team-header-name'>{team.team_name}</span>
                                        {sessionUser.id === team.team_owner_id &&
                                            <span className='my-team-settings'>
                                                <Link to={`/leagues/${leagueId}/teams/${teamNumber}/settings`} className='my-team-settings-link'>
                                                    <img className='my-team-settings-icon' src={settingsIcon} alt='settings' />
                                                    <span>Team Settings</span>
                                                </Link>
                                            </span>
                                        }
                                    </span>
                                    <span className='my-team-sub-header-box'>
                                        <Link to={`/leagues/${leagueId}`}>
                                            {league.league_name}
                                        </Link>
                                        <span>
                                            {team.team_owner.username}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className='test'>
                                <div className='my-team-total-title'>
                                    <span>CURRENT STANDINGS</span>
                                </div>
                                <div className='my-team-total-outer'>
                                    <div className='my-team-total-category'>
                                        <li className='current-standings-name'>
                                            <span>League Leader</span>
                                        </li>
                                        <li className='current-standings-name'>
                                            <span>Current Team</span>
                                        </li>
                                    </div>
                                    <ul className='my-team-total'>
                                        <li className='my-team-standings'>
                                            {currentLeader && currentLeader.id !== team.id ? (
                                                <>
                                                    <div className='my-team-standings-logo-box'>
                                                        <img className='my-team-standings-logo' src={currentLeader.team_image} />
                                                    </div>
                                                    <div className='my-team-leader'>
                                                        {currentLeader.team_name}
                                                    </div>
                                                    <div className='current-standings-scores'>
                                                        {currentLeader.fantasy_total}
                                                    </div>
                                                </>
                                            )
                                                : currentLeader && currentLeader.id === team.id ? (
                                                    <>
                                                        <div className='my-team-leader'>
                                                            You are the current league leader with the most fantasy points
                                                        </div>
                                                    </>
                                                )
                                                    :
                                                    <>
                                                        <div className='my-team-leader'>
                                                            There is no league leader at this time...
                                                        </div>
                                                        <div className='current-standings-scores'>
                                                            -
                                                        </div>
                                                    </>
                                            }
                                        </li>
                                        <li className='my-team-standings'>
                                            <div className='my-team-standings-logo-box'>
                                                <img className='my-team-standings-logo' src={team.team_image} />
                                            </div>
                                            <div className='my-team-leader'>
                                                {team.team_name}
                                            </div>
                                            <div className='current-standings-scores'>
                                                {team.fantasy_total}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='my-team-container'>
                            <table className='my-team-table'>
                                <thead>

                                    <tr className='team-player-column-headers'>
                                        <th className='column-1'>STARTERS</th>
                                        <th className='column-2'>STATS</th>
                                        <th className='column-3'>FANTASY PTS</th>
                                    </tr>
                                    <tr className='team-player-column-sub-headers'>
                                        <th className='sub-column-1'>
                                            <div>
                                                <span>PLAYER</span>
                                                <div className='column-label-1'>ACTION</div>
                                            </div>
                                        </th>
                                        <th className='sub-column-2'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className='sub-column-2-columns'>FGM</td>
                                                        <td className='sub-column-2-columns'>FGA</td>
                                                        <td className='sub-column-2-columns'>FTM</td>
                                                        <td className='sub-column-2-columns'>FTA</td>
                                                        <td className='sub-column-2-columns'>3PM</td>
                                                        <td className='sub-column-2-columns'>AST</td>
                                                        <td className='sub-column-2-columns'>REB</td>
                                                        <td className='sub-column-2-columns'>STL</td>
                                                        <td className='sub-column-2-columns'>BLK</td>
                                                        <td className='sub-column-2-columns'>TO</td>
                                                        <td className='sub-column-2-columns'>PTS</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                        <th className='sub-column-3'>TOT</th>
                                    </tr>

                                    {playerList.map(player => (
                                        <tr key={player.id} className='team-individual-player-row'>
                                            <td className='team-player-column'>
                                                <div className='team-player-info-box'>
                                                    <img src={`${player.player_image}`} alt='player'></img>
                                                    <div>
                                                        <PlayerModal player={player} />
                                                        <span>{player.position}</span>
                                                    </div>
                                                </div>
                                                {team.team_owner_id === sessionUser.id && (
                                                    <div className='team-player-action-box'>
                                                        <div>DROP</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className='team-player-stat-column'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className='sub-column-2-columns'>{player.field_goal_made}</td>
                                                            <td className='sub-column-2-columns'>{player.field_goal_attempted}</td>
                                                            <td className='sub-column-2-columns'>{player.free_throw_made}</td>
                                                            <td className='sub-column-2-columns'>{player.free_throw_attempted}</td>
                                                            <td className='sub-column-2-columns'>{player.three_point_made}</td>
                                                            <td className='sub-column-2-columns'>{player.assists}</td>
                                                            <td className='sub-column-2-columns'>{player.rebounds}</td>
                                                            <td className='sub-column-2-columns'>{player.steals}</td>
                                                            <td className='sub-column-2-columns'>{player.blocks}</td>
                                                            <td className='sub-column-2-columns'>{player.turnovers}</td>
                                                            <td className='sub-column-2-columns'>{player.points}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th className='team-fantasy-total-column'>
                                                {player.fantasy_total}
                                            </th>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </div>
                    </>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default MyTeam;
