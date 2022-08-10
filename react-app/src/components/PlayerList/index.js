import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers, clearPlayers } from "../../store/player";
import PlayerModal from "../PlayerModal";
import EditPlayerModal from "../EditPlayerModal";
import DeletePlayerModal from "../DeletePlayerModal";

const PlayerList = ({ leagueId }) => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const playerList = Object.values(players);

    useEffect(() => {
        dispatch(getAllPlayers(leagueId))

        return () => dispatch(clearPlayers())
    }, [dispatch, leagueId])


    return (
        playerList ?
            <div>
                {playerList.map(player => (
                    <div key={player.id}>
                        <PlayerModal player={player} />
                        <EditPlayerModal player={player} />
                        <DeletePlayerModal totalPlayers={playerList.length} playerId={player.id} />
                    </div>
                ))}
            </div>
            :
            <h3>Loading...</h3>
    )
}

export default PlayerList;
