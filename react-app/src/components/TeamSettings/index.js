import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import { getSingleTeam } from "../../store/team";
import Loading from "../Loading";
import EditTeamForm from "../EditTeamForm";
import TeamImageUpload from "../TeamImageUpload";
import DeleteTeamModal from "../DeleteTeamModal";
import AccessDenied from "../AccessDenied";
import InvalidTeamId from "../InvalidTeamId";
import InvalidLeagueId from "../InvalidLeagueId";
import './TeamSettings.css';

const TeamSettings = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { leagueId, teamNumber } = useParams();
    const leagueState = useSelector(state => state.leagues);
    const teamState = useSelector(state => state.teams);

    const [loading, setLoading] = useState(false);

    const league = leagueState[leagueId];
    const team = teamState[teamNumber];

    useEffect(() => {
        const fetchData = async () => {
            const leagueResponse = await dispatch(getSingleLeague(leagueId))
            await dispatch(getSingleTeam(leagueId, teamNumber))

            if (leagueResponse?.players_count < 10) {
                history.push(`/leagues/${leagueResponse.id}`);
            }

            setLoading(true)
        }

        fetchData();
    }, [dispatch, leagueId, teamNumber, history])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {loading ? league ? team ? team.team_owner_id === sessionUser.id ? (
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
                                <DeleteTeamModal deleteText='Delete Team / Leave League' warningText='you want to leave this league?' />
                            </div>
                        }
                    </div>
                )
                    :
                    <AccessDenied leagueId={leagueId} />
                    :
                    <InvalidTeamId />
                    :
                    <InvalidLeagueId />
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default TeamSettings;
