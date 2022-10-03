import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import { getSingleTeam } from "../../store/team";
import EditTeamForm from "../EditTeamForm";
import TeamImageUpload from "../TeamImageUpload";
import DeleteTeamModal from "../DeleteTeamModal";
import './TeamSettings.css';

const TeamSettings = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const { leagueId, teamNumber } = useParams();
    const leagueState = useSelector(state => state.leagues);
    const teamState = useSelector(state => state.teams);

    const league = leagueState[leagueId];
    const team = teamState[teamNumber];

    useEffect(() => {
        dispatch(getSingleLeague(leagueId))
        dispatch(getSingleTeam(leagueId, teamNumber))
    }, [dispatch])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {team ?
                    <div className='team-settings-container'>
                        <div className='team-settings-top-accent' />
                        <div className='team-settings-header'>
                            <h1 className='team-settings-header-main'>Team Settings</h1>
                            <h3 className='team-settings-header-sub'>{league?.league_name}</h3>
                        </div>
                        <div className='team-forms-container'>
                            <div className='team-settings-image-box'>
                                <div className='team-logo-box'>
                                    <img className='team-settings-logo' src={team?.team_image} alt='team logo' />
                                </div>
                                <TeamImageUpload />
                            </div>
                            <EditTeamForm />
                        </div>
                        {league && sessionUser.id !== league?.owner_id &&
                            <div className='team-settings-delete'>
                                <DeleteTeamModal />
                            </div>
                        }
                    </div>
                    :
                    <div>
                        not allowed
                    </div>
                }
            </div>
        </div>
    )
}

export default TeamSettings;
