import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editLeagueNote } from "../../store/league"
import $ from 'jquery';
import autosize from 'autosize';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const leagueId = league.id;
        const league_note_title = leagueNoteTitle;
        const league_note = leagueNote;

        const errors = await dispatch(editLeagueNote(leagueId, league_note_title, league_note));

        if (errors) {
            setValidationErrors(errors);
            setShowErrorModal(true);
        } else {
            setShowForm(false);
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();

        setShowForm(false);
        setLeagueNoteTitle(league.league_note_title);
        setLeagueNote(league.league_note);
    }

    useEffect(() => {
        $(function () {
            $('#edit-note').on('click', function () {
                $('#league-note-textarea').ready(function () {
                    const ele = document.getElementById('league-note-textarea')
                    ele.style.height = (ele.scrollHeight - 2) + 'px';
                })
            });
        });
        $(function () {
            $(document).on('focus', 'textarea', function () {
                autosize($('textarea'));
            });
        });

        return () => {
            $(function () {
                $(document).off();
            });
        }
    }, [])

    return (
        <div className='league-home-manager-box'>
            <div className='manager-note-header'>
                <div>League Manager's Note</div>
                {league.owner_id === sessionUser.id && (
                    <button id='edit-note' disabled={showForm} onClick={() => setShowForm(true)} className={showForm ? 'transparent-btn' : 'edit-btn'}>Edit League Note</button>
                )}
            </div>
            {!showForm ? (
                <div className='manager-note-content'>
                    <div className='manager-note-title'>{league.league_note_title}</div>
                    <div className='manager-note-text'>{league.league_note}</div>
                </div>
            ) :
                <form onSubmit={handleSubmit}>
                    <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={validationErrors} />
                    <div>
                        <input
                            value={leagueNoteTitle}
                            onChange={updateLeagueNoteTitle}
                            className='league-note-title-input'
                            placeholder='League Note Title (Required)'
                            maxLength='40' />
                        <textarea
                            value={leagueNote}
                            onChange={updateLeagueNote}
                            id='league-note-textarea'
                            className='league-note-textarea'
                            placeholder='League Note (Required)'
                            maxLength='1000' />
                        <div className='league-note-btn-container'>
                            <button disabled={disabled} className={disabled ? 'disabled-btn' : 'save-btn'} type='submit'>Save Changes</button>
                            <button onClick={handleCancel} className='cancel-btn'>Cancel Changes</button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}

export default LeagueNote;
