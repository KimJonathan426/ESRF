import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, NavLink } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import DeleteLeagueModal from '../DeleteLeagueModal';
import LeagueEditModal from '../LeagueEditModal';
import LeagueScoringForm from '../LeagueScoringModal';
import LeagueStartFormModal from '../LeagueStartFormModal';
import PlayerList from '../PlayerList';

const LeagueHome = () => {
    const dispatch = useDispatch();
    const { leagueId } = useParams();
    const leagueState = useSelector(state => state.leagues)
    const league = leagueState[leagueId]

    useEffect(() => {
        dispatch(getSingleLeague(leagueId));
    }, [dispatch, leagueId])

    return (
        league ?
            <div className='page-outer'>
                <div className='page-spacer'></div>
                <div className='page-container'>

                    <div>
                        Welcome to the {league.league_name} Page!
                        <LeagueEditModal currentLeagueName={league.league_name} leagueId={leagueId} leagueImage={league.league_image} />
                        <LeagueScoringForm currentLeague={league} />
                        <LeagueStartFormModal leagueId={leagueId} leagueDate={league.start_date} leagueTime={league.start_time} />
                        <DeleteLeagueModal leagueId={leagueId} />
                        <PlayerList leagueId={leagueId} />
                        <NavLink to={`/leagues/${leagueId}/players/new`}>Create a Player</NavLink>
                        <Link to={`/leagues/${leagueId}/players/edit/stats`}>Player Stat Sheet</Link>
                    </div>
                </div>
            </div>
            :
            <h3> Loading... </h3>
    )
}

export default LeagueHome
