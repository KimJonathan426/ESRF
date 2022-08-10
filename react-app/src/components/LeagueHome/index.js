import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import DeleteLeagueModal from '../DeleteLeagueModal';
import LeagueEditForm from '../LeagueEditForm';
import LeagueScoringForm from '../LeagueScoringForm';
import LeagueStartForm from '../LeagueStartForm';
import PlayerList from '../PlayerList';
import PlayerForm from '../PlayerForm';

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
            <div>
                Welcome to the {league.league_name} Page!
                <LeagueEditForm currentLeagueName={league.league_name} leagueId={leagueId} />
                <LeagueScoringForm currentLeague={league}/>
                <LeagueStartForm leagueId={leagueId} />
                <DeleteLeagueModal leagueId={leagueId}/>
                <PlayerList leagueId={leagueId}/>
                <PlayerForm leagueId={leagueId} />
                <Link to={`/leagues/${leagueId}/players/edit/stats`}>Player Stat Sheet</Link>
            </div>
            :
            <h3> Loading... </h3>
    )
}

export default LeagueHome
