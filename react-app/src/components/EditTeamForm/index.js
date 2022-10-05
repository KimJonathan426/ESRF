import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleTeam, editTeamInfo } from "../../store/team";
import ErrorModal from "../ErrorModal";
import './EditTeamForm.css';

const EditTeamForm = () => {
    const { leagueId, teamNumber } = useParams();

    const [team, setTeam] = useState('');
    const [teamLocation, setTeamLocation] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamAbre, setTeamAbre] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const team = await dispatch(getSingleTeam(leagueId, teamNumber))

            setTeam(team);
            setTeamLocation(team.team_location);
            setTeamName(team.team_name);
            setTeamAbre(team.team_abre);
            setLoaded(true);
        }

        fetchData();
    }, [dispatch, leagueId, teamNumber])

    useEffect(() => {
        if ((teamLocation !== team.team_location || teamName !== team.team_name || teamAbre !== team.team_abre) && hidden && loaded) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [teamLocation, team.team_location, teamName, team.team_name, teamAbre, team.team_abre, hidden, loaded])

    useEffect(() => {
        let updated;

        if (!hidden) {
            updated = setTimeout(() => {
                setHidden(true);
            }, 2000);
        }

        return () => {
            if (updated) {
                clearTimeout(updated);
            }
        }
    }, [hidden])

    const updateTeamLocation = (e) => {
        setTeamLocation(e.target.value);
    };
    const updateTeamName = (e) => {
        setTeamName(e.target.value);
    };
    const updateTeamAbre = (e) => {
        setTeamAbre(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];
        const team_location = teamLocation;
        const team_name = teamName;
        const team_abre = teamAbre;

        const editedTeam = await dispatch(editTeamInfo(leagueId, teamNumber, team_location, team_name, team_abre));

        if (editedTeam && editedTeam.errors === undefined) {
            setTeam(editedTeam);
            if (hidden) {
                setHidden(false);
            }
        } else if (editedTeam.errors) {
            errors.push(...editedTeam.errors);
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
    }

    return (
        <form className='edit-team-form' onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
            <div>
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
            </div>

            <div className='team-required-notice'>
                <span>*</span>= Required
            </div>

            <div className='team-btn-box'>
                <div hidden={hidden} className='team-updated'>Team updated!</div>
                <button disabled={disabled} className={disabled ? 'disabled-btn team-save-btn' : 'save-btn team-save-btn'}>Save Changes</button>
            </div>
        </form>
    )
}

export default EditTeamForm;
