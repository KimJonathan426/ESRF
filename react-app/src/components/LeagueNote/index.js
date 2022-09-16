import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { editLeagueNote } from "../../store/league"
import ErrorModal from '../ErrorModal';
import './LeagueNote.css';

const LeagueNote = ({ league, sessionUser }) => {
    const [leagueNoteTitle, setLeagueNoteTitle] = useState(league.league_note_title);
    const [leagueNote, setLeagueNote] = useState(league.league_note);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (leagueNoteTitle !== league.league_note_title || leagueNote !== league.league_note) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [dispatch, leagueNoteTitle, league.league_note_title, leagueNote, league.league_note])

    const updateLeagueNoteTitle = (e) => {
        setLeagueNoteTitle(e.target.value);
    }
    const updateLeagueNote = (e) => {
        setLeagueNote(e.target.value);
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const league_note_title = leagueNoteTitle;
    //     const league_note = leagueNote;

    //     const errors = await dispatch(editLeagueNote(leagueId, league_note_title, league_note));

    //     if (errors) {
    //         setValidationErrors(errors);
    //         setShowErrorModal(true);
    //     } else {
    //         setShowForm(false);
    //     }
    // };

    return (
        <div className='league-home-manager-box'>
            <div className='manager-note-header'>
                <div>League Manager's Note</div>
                {league.owner_id === sessionUser.id && !showForm ? (
                    <button onClick={() => setShowForm(true)} className='edit-btn'>Edit League Note</button>
                ) :
                    <button onClick={() => setShowForm(false)} className='edit-btn'>Cancel Changes</button>
                }
            </div>
            {!showForm ? (
                <div className='manager-note-content'>
                    <div className='manager-note-title'>{league.league_note_title}</div>
                    <div className='manager-note-text'>{league.league_note}</div>
                </div>
            ) :
                <form>
                    <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                    <input
                        value={leagueNoteTitle}
                        onChange={updateLeagueNoteTitle}
                        placeholder='League Note Title (Required)'
                        maxLength='40' />
                    <input
                        value={leagueNote}
                        onChange={updateLeagueNote}
                        placeholder='League Note (Required)'
                        maxLength='1000' />
                    <button disabled={disabled} className={disabled ? 'disabled-btn' : 'save-btn'} type='submit'>Save Changes</button>
                </form>
            }
        </div>
    )
}

export default LeagueNote;
