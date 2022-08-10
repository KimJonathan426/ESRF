import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getAllPlayers } from "../../store/player";
import EditPlayerStatForm from "../EditPlayerStatForm";

const EditPlayerStatSheet = () => {
    const players = useSelector(state => state.players);
    const playerList = Object.values(players);
    const { leagueId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPlayers(leagueId))
    }, [dispatch, leagueId])

    return (
        <>
            <div>Player Stat Sheet</div>
            {playerList ? (
                playerList.map(player => (
                    <div key={player.id}>
                        <EditPlayerStatForm currentPlayer={player} />
                    </div>
                ))
            )
                :
                <h3>Loading...</h3>
            }
        </>
    )
}

export default EditPlayerStatSheet;
