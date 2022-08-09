import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../../store/player";

const PlayerList = ({ leagueId }) => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const playerList = Object.values(players);

    useEffect(() => {
        dispatch(getAllPlayers(leagueId))
    }, [dispatch, leagueId])


    return (
        playerList ?
            <div>
                {playerList.map(player => (
                    <div key={player.id}>
                        {player.player_name}
                    </div>
                ))}
            </div>
            :
            <h3>Loading...</h3>
    )
}

export default PlayerList;
