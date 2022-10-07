import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { addLeague } from "../../store/league"
import { addTeam } from "../../store/team";
import ErrorModal from '../ErrorModal';
import './BaseLeagueForm.css'

const BaseLeagueForm = ({ sessionUser }) => {
    const [leagueName, setLeagueName] = useState('');
    const [teamLimit, setTeamLimit] = useState(3);
    const [teamPlayerLimit, setTeamPlayerLimit] = useState(5);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);


    const history = useHistory();
    const dispatch = useDispatch();

    const updateLeagueName = (e) => {
        setLeagueName(e.target.value);
    }
    const updateTeamLimit = (e) => {
        const oldTeamOption = document.getElementById(`team-${teamLimit}`)
        oldTeamOption.classList.remove('choice')
        oldTeamOption.classList.add('team-options')
        setTeamLimit(e.target.value);
    }
    const updateTeamPlayerLimit = (e) => {
        const oldPlayerOption = document.getElementById(`player-${teamPlayerLimit}`)
        oldPlayerOption.classList.remove('choice')
        oldPlayerOption.classList.add('player-options')
        setTeamPlayerLimit(e.target.value);
    }

    useEffect(() => {
        const newTeamOption = document.getElementById(`team-${teamLimit}`)
        newTeamOption.classList.remove('team-options')
        newTeamOption.classList.add('choice')

    }, [teamLimit])

    useEffect(() => {
        const newPlayerOption = document.getElementById(`player-${teamPlayerLimit}`)
        newPlayerOption.classList.remove('player-options')
        newPlayerOption.classList.add('choice')

    }, [teamPlayerLimit])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];

        const league_name = leagueName;
        const team_limit = teamLimit;
        const team_player_limit = teamPlayerLimit;

        const createdLeague = await dispatch(addLeague(league_name, team_limit, team_player_limit));

        if (createdLeague && createdLeague.errors === undefined) {

            const leagueId = createdLeague.id;
            const team_location = 'Team';
            const team_name = sessionUser.username;
            const team_abre = sessionUser.username.slice(0, 4).toUpperCase();

            await dispatch(addTeam(leagueId, team_location, team_name, team_abre))
            history.push(`/leagues/${createdLeague.id}/required-players/new`);
        }
        else if (createdLeague.errors) {
            errors.push(...createdLeague.errors);
            setValidationErrors(errors);
            setShowErrorModal(true);
        }
    };

    return (
        <div className='page-outer create-league-background'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                <div className='create-league-container'>
                    <div className='create-league-title'>
                        <div className='logo-wrapper'>
                            <img className='create-league-logo' src='https://esrf.s3.amazonaws.com/Default-League-Logo.jpg' alt='league logo' />
                        </div>
                        <div className='create-league-title-text'>
                            Create Your Fantasy <br /> Basketball League
                        </div>
                    </div>
                    <div className='create-league-form-container'>
                        <form className='create-league-form' onSubmit={handleSubmit}>
                            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                            <div className='league-name-container'>
                                <label>League Name</label>
                                <input
                                    value={leagueName}
                                    onChange={updateLeagueName}
                                    placeholder='League Name (Required)'
                                    maxLength='40' />
                            </div>

                            <div className='team-number-container'>
                                <label>Number of Teams</label>

                                <div className='team-radio-options'>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-2'
                                        value={2}
                                        onChange={updateTeamLimit} />
                                    <label id='team-2' className='team-options' htmlFor='team-limit-2'>2</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-3'
                                        value={3}
                                        onChange={updateTeamLimit}
                                        defaultChecked />
                                    <label id='team-3' className='choice' htmlFor='team-limit-3'>3</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-4'
                                        value={4}
                                        onChange={updateTeamLimit} />
                                    <label id='team-4' className='team-options' htmlFor='team-limit-4'>4</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-5'
                                        value={5}
                                        onChange={updateTeamLimit} />
                                    <label id='team-5' className='team-options' htmlFor='team-limit-5'>5</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-6'
                                        value={6}
                                        onChange={updateTeamLimit} />
                                    <label id='team-6' className='team-options' htmlFor='team-limit-6'>6</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-7'
                                        value={7}
                                        onChange={updateTeamLimit} />
                                    <label id='team-7' className='team-options' htmlFor='team-limit-7'>7</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-8'
                                        value={8}
                                        onChange={updateTeamLimit} />
                                    <label id='team-8' className='team-options' htmlFor='team-limit-8'>8</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-9'
                                        value={9}
                                        onChange={updateTeamLimit} />
                                    <label id='team-9' className='team-options' htmlFor='team-limit-9'>9</label>
                                    <input
                                        name='team-limit'
                                        type='radio'
                                        id='team-limit-10'
                                        value={10}
                                        onChange={updateTeamLimit} />
                                    <label id='team-10' className='team-options' htmlFor='team-limit-10'>10</label>
                                </div>
                            </div>

                            <div>
                                <label>Number of Players Per Team</label>
                                <div className='player-radio-options'>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-2'
                                        value={2}
                                        onChange={updateTeamPlayerLimit} />
                                    <label id='player-2' className='player-options' htmlFor='player-limit-2'>2</label>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-3'
                                        value={3}
                                        onChange={updateTeamPlayerLimit} />
                                    <label id='player-3' className='player-options' htmlFor='player-limit-3'>3</label>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-4'
                                        value={4}
                                        onChange={updateTeamPlayerLimit} />
                                    <label id='player-4' className='player-options' htmlFor='player-limit-4'>4</label>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-5'
                                        value={5}
                                        onChange={updateTeamPlayerLimit}
                                        defaultChecked />
                                    <label id='player-5' className='choice' htmlFor='player-limit-5'>5</label>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-6'
                                        value={6}
                                        onChange={updateTeamPlayerLimit} />
                                    <label id='player-6' className='player-options' htmlFor='player-limit-6'>6</label>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-7'
                                        value={7}
                                        onChange={updateTeamPlayerLimit} />
                                    <label id='player-7' className='player-options' htmlFor='player-limit-7'>7</label>
                                    <input
                                        name='player-limit'
                                        type='radio'
                                        id='player-limit-8'
                                        value={8}
                                        onChange={updateTeamPlayerLimit} />
                                    <label id='player-8' className='player-options' htmlFor='player-limit-8'>8</label>
                                </div>
                            </div>

                            <div className='create-league-btn-container'>
                                <button className='create-league-btn' type='submit'>Create League</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseLeagueForm;
