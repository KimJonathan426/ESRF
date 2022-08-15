import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPlayers, clearPlayers } from "../../store/player";
import PlayerModal from "../PlayerModal";
import EditPlayerModal from "../EditPlayerModal";
import DeletePlayerModal from "../DeletePlayerModal";
import './PlayerList.css';

const PlayerList = () => {
    const { leagueId } = useParams();
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const playerList = Object.values(players);

    useEffect(() => {
        dispatch(getAllPlayers(leagueId))

        return () => dispatch(clearPlayers())
    }, [dispatch, leagueId])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                <div className='free-agent-title-accent'></div>
                <div className='free-agents-title'>
                    Free Agents
                    <span>Browse all available players below...</span>
                    </div>
                {playerList ?
                    <div className='free-agents-container'>
                        <table className='free-agents-table'>
                            <tr className='player-column-headers'>
                                <th className='column-1'>PLAYERS</th>
                                <th className='column-2'>STATS</th>
                                <th className='column-3'>FANTASY PTS</th>
                            </tr>
                            <tr className='player-column-sub-headers'>
                                <th className='sub-column-1'>PLAYER</th>
                                <th className='sub-column-2'>
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
                                </th>
                                <th className='sub-column-3'>TOT</th>
                            </tr>

                            {playerList.map(player => (
                                <tr key={player.id} className='individual-player-row'>
                                    <td className='player-column'>
                                        <div className='player-info-box'>
                                            <img src={`${player.player_image}`} alt='player'></img>
                                            <div>
                                                <PlayerModal player={player} />
                                                <span>{player.position}</span>
                                            </div>
                                        </div>
                                        <div className='player-action-box'>
                                            <EditPlayerModal player={player} />
                                            <DeletePlayerModal totalPlayers={playerList.length} playerId={player.id} />
                                        </div>
                                    </td>
                                    <td className='player-stat-column'>
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
                                    </td>
                                    <td className='fantasy-total-column'>
                                        {player.fantasy_total}
                                    </td>
                                </tr>
                            ))}
                        </table>
                        <div className='table-spacer'></div>
                    </div>
                    :
                    <h3>Loading...</h3>
                }
            </div>
        </div>
    )
}

export default PlayerList;
