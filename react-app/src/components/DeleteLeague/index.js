import { useDispatch } from "react-redux";
import { deleteLeague } from "../../store/league";

const DeleteLeague = ({ leagueId }) => {
    const dispatch = useDispatch();

    const onDelete = async () => {
        await dispatch(deleteLeague(leagueId));
    }

    return (
        <button onClick={onDelete}>Delete League</button>
    )
}

export default DeleteLeague;
