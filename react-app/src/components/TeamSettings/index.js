import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import { getSingleTeam } from "../../store/team";
import EditTeamForm from "../EditTeamForm";
import DeleteTeamModal from "../DeleteTeamModal";
import './TeamSettings.css';

const TeamSettings = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId, teamNumber } = useParams();
    const leagueState = useSelector(state => state.leagues)

    const league = leagueState[leagueId];

    useEffect(() => {
        dispatch(getSingleLeague(leagueId))
        dispatch(getSingleTeam(leagueId, teamNumber))
    }, [dispatch])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                <div className='team-settings-container'>
                    <div className='team-settings-top-accent' />
                    <div className='team-settings-header'>
                        <h1 className='team-settings-header-main'>Team Settings</h1>
                        <h3 className='team-settings-header-sub'>{league?.league_name}</h3>
                    </div>
                    <div className='team-forms-container'>
                        <div>Image Edit</div>
                        <EditTeamForm />
                    </div>
                    <DeleteTeamModal />
                </div>
            </div>
        </div>
    )
}

export default TeamSettings;
