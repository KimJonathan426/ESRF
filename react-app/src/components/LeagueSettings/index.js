import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getSingleLeague } from "../../store/league";
import DeleteLeagueModal from "../DeleteLeagueModal";
import InvalidLeagueId from "../InvalidLeagueId";
import LeagueEditFormModal from "../LeagueEditModal";
import LeagueScoringModal from "../LeagueScoringModal";
import LeagueStartFormModal from "../LeagueStartFormModal";
import Loading from "../Loading";
import './LeagueSettings.css';

const LeagueSettings = ({ sessionUser }) => {
    const { leagueId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const leagueState = useSelector(state => state.leagues);
    const league = leagueState[leagueId]
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const leagueResponse = await dispatch(getSingleLeague(leagueId));

            if (leagueResponse?.players_count < 10) {
                history.push(`/leagues/${leagueResponse.id}`);
            }

            setLoading(true);
        }

        fetchData();
    }, [dispatch, leagueId])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {loading ? league ? (
                    <>
                        <div className='top-accent'></div>
                        <div className='settings-container'>
                            <div className='settings-title'>League Settings
                                <Link to={`/leagues/${leagueId}`}>
                                    <div className='back-btn'>⮨ Back</div>
                                </Link>
                            </div>
                            <div className='settings-sub-title'>
                                <div>Basic Settings</div>
                                {league?.owner_id === sessionUser.id && (
                                    <LeagueEditFormModal currentLeagueName={league.league_name} leagueId={league.id} leagueImage={league.league_image} />
                                )}
                            </div>
                            <div className='league-settings-container'>
                                <div className='settings-labels'>
                                    <div className='gray'>League Name</div>
                                    <div>Number of Teams</div>
                                    <div className='gray'>Players Per Team</div>
                                </div>
                                <div className='settings-info'>
                                    <div className='gray'>{league.league_name}</div>
                                    <div>{league.team_limit}</div>
                                    <div className='gray'>{league.team_player_limit}</div>
                                </div>
                            </div>
                            <div className='settings-sub-title'>
                                <div>Game Settings</div>
                                {league.owner_id === sessionUser.id && (
                                    <LeagueStartFormModal leagueId={league.id} leagueDate={league.start_date} leagueTime={league.start_time} />
                                )}
                            </div>
                            <div className='league-settings-container'>
                                <div className='settings-labels'>
                                    <div className='gray'>Game Date</div>
                                </div>
                                <div className='settings-info'>
                                    <div className='gray'>{league.start_standard}</div>
                                </div>
                            </div>
                            <div className='settings-sub-title'>
                                <div>Scoring</div>
                                {league.owner_id === sessionUser.id && (
                                    <LeagueScoringModal currentLeague={league} />
                                )}
                            </div>
                            <div className='league-settings-container'>
                                <div className='settings-labels'>
                                    <div className='gray'>Field Goal Made (FGM)</div>
                                    <div>Field Goal Attempted (FGA)</div>
                                    <div className='gray'>Free Throw Made (FTM)</div>
                                    <div>Free Throw Attempted (FTA)</div>
                                    <div className='gray'>Three Point Made (3PM)</div>
                                    <div>Assists (AST)</div>
                                    <div className='gray'>Rebounds (REB)</div>
                                    <div>Steals (STL)</div>
                                    <div className='gray'>Blocks (BLK)</div>
                                    <div>Turnovers (TO)</div>
                                    <div className='gray'>Points (PTS)</div>
                                </div>
                                <div className='settings-info'>
                                    <div className='gray'>{league.field_goal_made_weight}</div>
                                    <div>{league.field_goal_attempted_weight}</div>
                                    <div className='gray'>{league.free_throw_made_weight}</div>
                                    <div>{league.free_throw_attempted_weight}</div>
                                    <div className='gray'>{league.three_point_made_weight}</div>
                                    <div>{league.assists_weight}</div>
                                    <div className='gray'>{league.rebounds_weight}</div>
                                    <div>{league.steals_weight}</div>
                                    <div className='gray'>{league.blocks_weight}</div>
                                    <div>{league.turnovers_weight}</div>
                                    <div className='gray'>{league.points_weight}</div>
                                </div>
                            </div>
                            {league.owner_id === sessionUser.id && (
                                <DeleteLeagueModal leagueId={leagueId} />
                            )}
                        </div>
                    </>
                )
                    :
                    <InvalidLeagueId />
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default LeagueSettings;
