import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllLeagues } from '../../store/league';

const LeagueList = () => {
    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leagues);
    const leagueList = Object.values(leagues);

    console.log('leagueList', leagueList)

    useEffect(() => {
        dispatch(getAllLeagues());
    }, [dispatch])

    return (
        leagueList ?
            <div>
                {leagueList.map(league => (
                    <div key={league.id}>
                        <Link to='/leagues/:leagueId'>{league.league_name}</Link>
                    </div>
                ))}
            </div>
            :
            <h3>Loading...</h3>
    )
}

export default LeagueList
