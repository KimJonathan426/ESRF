import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPublicLeagues } from '../../store/league';
import Loading from '../Loading';
import './LeagueList.css';

const LeagueList = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leagues);
    const leagueList = Object.values(leagues);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getPublicLeagues(sessionUser.id));

            setLoading(true);
        }

        fetchData();
    }, [dispatch, sessionUser.id])
    console.log('leagueList', leagueList.length)
    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='page-container'>
                <div className='public-top-accent'></div>
                <div className='public-title-container'>
                    <div className='public-league-title'>Leagues can range anywhere from recreational organizations, pick-up games, to any custom format...</div>
                    <div className='public-league-title'>Choose from one of the leagues below and explore what the community has to offer!</div>
                </div>
                {loading ? leagueList.length > 0 ?
                    <div className='public-leagues-container'>
                        {leagueList.map(league => (
                            <div key={league.id} className='my-league'>
                                <Link to={`/leagues/${league.id}`}>
                                    <div className='home-league-info'>{league.league_name}</div>
                                    <img className='my-leagues-logo' src={`${league.league_image}`} alt='league-logo' />
                                </Link>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='no-leagues'>
                        Looks like there aren't any available leagues at the moment...
                        <div>
                            Check back later or&nbsp;
                            <Link to='/leagues/new' className='public-to-create'>
                                make your own league
                            </Link>
                            !
                        </div>
                    </div>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default LeagueList
