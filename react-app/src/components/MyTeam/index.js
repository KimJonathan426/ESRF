import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import { getSingleTeam } from "../../store/team";
import PlayerModal from "../PlayerModal";
import DropPlayer from "../DropPlayer";
import InvalidTeamId from "../InvalidTeamId";
import InvalidLeagueId from "../InvalidLeagueId";
import Loading from "../Loading";
import settingsIcon from '../../images/settings-icon.png';
import './MyTeam.css';

const MyTeam = ({ sessionUser }) => {
    const { leagueId, teamNumber } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const teamState = useSelector(state => state.teams);
    const leagueState = useSelector(state => state.leagues);
    const league = leagueState[leagueId];
    const teamFromState = Object.values(teamState)[0];

    const [playerList, setPlayerList] = useState([]);
    const [team, setTeam] = useState(false);
    const [loading, setLoading] = useState(false);

    let max = -Infinity;
    let currentLeader;

    if (league) {
        for (let team of league?.teams) {
            if (team.fantasy_total > max) {
                max = team.fantasy_total;
                currentLeader = team;
            }
        }
    }

    useEffect(() => {
        setPlayerList(teamFromState?.players);
    }, [teamFromState?.players,])

    const remainingTeamSpace = league?.team_player_limit - teamFromState?.players?.length;

    useEffect(() => {
        const fetchData = async () => {
            const teamResponse = await dispatch(getSingleTeam(leagueId, teamNumber))
            const leagueResponse = await dispatch(getSingleLeague(leagueId))

            if (leagueResponse?.players_count < 10) {
                history.push(`/leagues/${leagueResponse.id}`);
            }

            setPlayerList(teamResponse.players);

            if (teamResponse.errors === undefined) {
                setTeam(teamResponse);
            }

            setLoading(true);
        }

        fetchData();
    }, [dispatch, leagueId, teamNumber, history])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {!isNaN(teamNumber) ? loading ? league ? team ? teamFromState ?
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
                                            {league.is_active && currentLeader && currentLeader.id !== team.id ? (
                                                <>
                                                    <div className='my-team-standings-logo-box'>
                                                        <img className='my-team-standings-logo' src={currentLeader.team_image} alt='team logo' />
                                                    </div>
                                                    <div className='my-team-leader'>
                                                        {currentLeader.team_name}
                                                    </div>
                                                    <div className='current-standings-scores'>
                                                        {currentLeader.fantasy_total}
                                                    </div>
                                                </>
                                            )
                                                : league.is_active && currentLeader && currentLeader.id === team.id ? (
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
                                                <img className='my-team-standings-logo' src={team.team_image} alt='team logo'/>
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

                                    {playerList?.map(player => (
                                        <tr key={player.id} className='team-individual-player-row'>
                                            <td className='team-player-column'>
                                                <div className='team-player-info-box'>
                                                    <div className='team-player-info-image'>
                                                        <img src={`${player.player_image}`} alt='player' />
                                                    </div>
                                                    <div className='team-player-info'>
                                                        <PlayerModal player={player} />
                                                        <span>{player.position}</span>
                                                    </div>
                                                </div>
                                                {teamFromState.team_owner_id === sessionUser.id && !league.is_active && (
                                                    <div className='team-player-action-box add-player-only'>
                                                        <DropPlayer player={player} />
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
                                    {remainingTeamSpace > 0 && [...Array(remainingTeamSpace)].map((e, i) => (
                                        <tr key={i} className='team-individual-player-row'>
                                            <td className='team-player-column'>
                                                <div className='empty-player-info-box'>
                                                    <img src='https://esrf.s3.amazonaws.com/Empty-Player-Image.png' alt='empty player' />
                                                    <div className='empty-player-label'>
                                                        Empty
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='team-player-stat-column'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                            <td className='sub-column-2-columns'>--</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th className='team-fantasy-total-column'>
                                                --
                                            </th>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </div>
                    </>
                    :
                    <Loading />
                    :
                    <InvalidTeamId />
                    :
                    <InvalidLeagueId />
                    :
                    <Loading />
                    :
                    <InvalidTeamId />
                }
            </div>
        </div>
    )
}

export default MyTeam;
