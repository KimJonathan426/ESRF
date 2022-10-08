import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPlayers } from "../../store/player";
import PlayerModal from "../PlayerModal";
import EditPlayerModal from "../EditPlayerModal";
import DeletePlayerModal from "../DeletePlayerModal";
import { getSingleLeague } from "../../store/league";
import TeamAddPlayer from "../TeamAddPlayer";
import Loading from "../Loading";
import './PlayerList.css';

const PlayerList = ({ sessionUser }) => {
    const { leagueId } = useParams();
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const leagueState = useSelector(state => state.leagues);
    const league = leagueState[leagueId];
    const playerList = Object.values(players);

    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState(false);
    const [teamPlayers, setTeamPlayers] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllPlayers(leagueId))
            const leagueResponse = await dispatch(getSingleLeague(leagueId))

            let temp;

            for (let team of leagueResponse.teams) {
                if (sessionUser.id === team.team_owner_id) {
                    setTeam(team);
                    temp = team;
                    break;
                }
            }

            if (temp) {
                const playerDict = {};
                for (let player of temp.players) {
                    playerDict[player.id] = true;
                }

                setTeamPlayers(playerDict);
            }

            setLoading(true);
        }

        fetchData();

    }, [dispatch, leagueId, sessionUser.id])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {loading ?
                    <>
                        <div className='free-agent-title-accent'></div>
                        <div className='free-agents-title'>
                            Free Agents
                            <span>Browse all available players below...</span>
                        </div>
                        {playerList &&
                            <div className='free-agents-container'>
                                <table className='free-agents-table'>
                                    <thead>

                                        <tr className='player-column-headers'>
                                            <th className='column-1'>PLAYERS</th>
                                            <th className='column-2'>STATS</th>
                                            <th className='column-3'>FANTASY PTS</th>
                                        </tr>
                                        <tr className='player-column-sub-headers'>
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
                                            <tr key={player.id} className='individual-player-row'>
                                                <td className='player-column'>
                                                    <div className='player-info-box'>
                                                        <div className='player-info-image'>
                                                            <img src={`${player.player_image}`} alt='player' />
                                                        </div>
                                                        <div className='player-info'>
                                                            <PlayerModal player={player} />
                                                            <span>{player.position}</span>
                                                        </div>
                                                    </div>
                                                    {team && teamPlayers && !(player.id in teamPlayers) &&
                                                        <div className={league.owner_id === sessionUser.id ? 'player-action-box' : 'player-action-box add-player-only'}>
                                                            <TeamAddPlayer playerLimit={league.team_player_limit} teamNumber={team.team_number} player={player} />
                                                        </div>
                                                    }
                                                    {league.owner_id === sessionUser.id && (
                                                        <div className='player-action-box'>
                                                            <EditPlayerModal player={player} />
                                                            <DeletePlayerModal totalPlayers={playerList.length} playerId={player.id} />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className='player-stat-column'>
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
                                                <th className='fantasy-total-column'>
                                                    {player.fantasy_total}
                                                </th>
                                            </tr>
                                        ))}
                                    </thead>
                                </table>
                                <div className='table-spacer'></div>
                            </div>
                        }
                    </>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default PlayerList;
