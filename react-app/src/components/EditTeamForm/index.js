import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTeam } from "../../store/team";
import './EditTeamForm.css';

const EditTeamForm = () => {
    const { leagueId, teamNumber } = useParams();

    const [teamLocation, setTeamLocation] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamAbre, setTeamAbre] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getSingleTeam(leagueId, teamNumber))

            setTeamLocation(response.team_location);
            setTeamName(response.team_name);
            setTeamAbre(response.team_abre);
        }

        fetchData();
    }, [dispatch, leagueId, teamNumber])

    const updateTeamLocation = (e) => {
        setTeamLocation(e.target.value);
    };
    const updateTeamName = (e) => {
        setTeamName(e.target.value);
    };
    const updateTeamAbre = (e) => {
        setTeamAbre(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <form className='edit-team-form' onSubmit={handleSubmit}>
            <div>
                <label className='edit-team-label'><span>*</span>Location</label>
                <input
                    className='team-settings-location'
                    value={teamLocation}
                    onChange={updateTeamLocation}
                    maxLength='15'
                />
            </div>

            <div>
                <label className='edit-team-label'><span>*</span>Nickname</label>
                <input
                    className='team-settings-name'
                    value={teamName}
                    onChange={updateTeamName}
                    maxLength='20'
                />
            </div>

            <div>
                <label className='edit-team-label'><span>*</span>Abbreviation</label>
                <input
                    className='team-settings-abre'
                    value={teamAbre}
                    onChange={updateTeamAbre}
                    maxLength='4'
                />
            </div>
        </form>
    )
}

export default EditTeamForm;
