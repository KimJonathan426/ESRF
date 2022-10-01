import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addTeam } from "../../store/team";
import './BaseTeamForm.css';

const BaseTeamForm = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>

            </div>
        </div>
    )
}

export default BaseTeamForm;
