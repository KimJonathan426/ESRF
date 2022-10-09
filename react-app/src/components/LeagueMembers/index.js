import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import { getAllTeams } from '../../store/team';
import DeleteTeamModal from '../DeleteTeamModal';
import InvalidLeagueId from '../InvalidLeagueId';
import Loading from '../Loading';
import './LeagueMembers.css';

const LeagueMembers = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { leagueId } = useParams();
    const leagueState = useSelector(state => state.leagues);
    const teamState = useSelector(state => state.teams);
    const league = leagueState[leagueId];

    const teams = Object.values(teamState);

    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const leagueResponse = await dispatch(getSingleLeague(leagueId));
            await dispatch(getAllTeams(leagueId));

            if (leagueResponse?.players_count < 10) {
                history.push(`/leagues/${leagueResponse.id}`);
            }

            setLoaded(true);
        }

        fetchData();
    }, [dispatch, leagueId, history])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                {loaded ? league ? (
                    <>
                        <div className='members-top-accent' />
                        <div className='members-container'>
                            <div className='members-header'>
                                <h1 className='members-header-main'>League Members</h1>
                                <h3 className='members-header-sub'>{league.league_name}</h3>
                            </div>
                            <table className='members-content'>
                                <colgroup className='members-table-colgroup'>
                                    <col className='members-table-col' />
                                    <col className='members-table-col' />
                                    <col className='members-table-col' />
                                    <col className='members-table-col' />
                                    <col className='members-table-col' />
                                    <col className='members-table-col' />
                                    <col className='members-table-col' />
                                </colgroup>
                                <thead className='members-table-head'>
                                    <tr>
                                        <th className='members-table-th th-1' >#</th>
                                        <th className='members-table-th th-2'>ABBRV</th>
                                        <th className='members-table-th th-3'>TEAM NAME</th>
                                        <th className='members-table-th th-4'>MANAGER NAME</th>
                                        <th className='members-table-th th-5'>EMAIL</th>
                                        <th className='members-table-th th-6'>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className='members-table-body'>
                                    {teams.map(team => (
                                        <tr key={team.id} className='members-table-inner-border'>
                                            {sessionUser.id === team.team_owner_id ? (
                                                <>
                                                    <td className='members-table-td th-1 team-bold'>
                                                        {team.team_number}
                                                    </td>
                                                    <td className='members-table-td th-2 team-bold'>
                                                        {team.team_abre}
                                                    </td>
                                                    <td title={team.team_name} className='members-table-td th-3 team-bold'>
                                                        <Link to={`/leagues/${leagueId}`} className='members-team-link'>
                                                            <div className='members-team-logo-box'>
                                                                <img className='members-team-logo' src={team.team_image} alt='team logo' />
                                                            </div>
                                                            <span>{team.team_name}</span>
                                                        </Link>
                                                    </td>
                                                    <td className='members-table-td th-4 team-bold'>
                                                        {team.team_owner.username}
                                                    </td>
                                                    <td title={team.team_owner.email} className='members-table-td th-5 team-bold members-user-email'>
                                                        <span>
                                                            {team.team_owner.email}
                                                        </span>
                                                    </td>
                                                    {sessionUser.id !== league.owner_id &&
                                                        <td className='members-table-td th-6 team-bold'>
                                                            <DeleteTeamModal deleteText='REMOVE MANAGER' warningText='you want to leave this league?'/>
                                                        </td>
                                                    }
                                                </>
                                            )
                                                : (
                                                    <>
                                                        <td className='members-table-td th-1'>
                                                            {team.team_number}
                                                        </td>
                                                        <td className='members-table-td th-2'>
                                                            {team.team_abre}
                                                        </td>
                                                        <td title={team.team_name} className='members-table-td th-3'>
                                                            <Link to={`/leagues/${leagueId}`} className='members-team-link'>
                                                                <div className='members-team-logo-box'>
                                                                    <img className='members-team-logo' src={team.team_image} alt='team logo' />
                                                                </div>
                                                                <span>{team.team_name}</span>
                                                            </Link>
                                                        </td>
                                                        <td className='members-table-td th-4'>
                                                            {team.team_owner.username}
                                                        </td>
                                                        <td title={team.team_owner.email} className='members-table-td th-5 members-user-email'>
                                                            <span>
                                                                {team.team_owner.email}
                                                            </span>
                                                        </td>
                                                        {team.team_owner_id !== league.owner_id && sessionUser.id === league.owner_id &&
                                                        <td className='members-table-td th-6'>
                                                            <DeleteTeamModal deleteText='REMOVE MANAGER' warningText={`you want to remove ${team.team_name} from this league?`}/>
                                                        </td>
                                                    }
                                                    </>
                                                )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default LeagueMembers;
