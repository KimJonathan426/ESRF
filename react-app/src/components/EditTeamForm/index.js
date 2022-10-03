import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTeam } from "../../store/team";
import './EditTeamForm.css';

const EditTeamForm = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId, teamNumber } = useParams();
    console.log('leagueId, teamNumber', leagueId, teamNumber)

    useEffect(() => {
        dispatch(getSingleTeam(leagueId, teamNumber))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                Hi
            </div>
        </div>
    )
}

export default EditTeamForm;
