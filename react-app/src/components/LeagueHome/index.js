import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import DeleteLeagueModal from '../DeleteLeagueModal';
import LeagueEditForm from '../LeagueEditForm';
import LeagueScoringForm from '../LeagueScoringForm';
import LeagueStartForm from '../LeagueStartForm';
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
            <div>
                Welcome to the {league.league_name} Page!
                <LeagueEditForm currentLeagueName={league.league_name} leagueId={leagueId} />
                <LeagueScoringForm currentLeague={league}/>
                <LeagueStartForm leagueId={leagueId} />
                <DeleteLeagueModal leagueId={leagueId}/>
                <PlayerList leagueId={leagueId}/>
            </div>
            :
            <h3> Loading... </h3>
    )
}

export default LeagueHome
