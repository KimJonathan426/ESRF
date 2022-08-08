import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleLeague } from '../../store/league';
import LeagueEditForm from '../LeagueEditForm';
import LeagueScoringForm from '../LeagueScoringForm';
import LeagueStartForm from '../LeagueStartForm';

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
            </div>
            :
            <h3> Loading... </h3>
    )
}

export default LeagueHome
