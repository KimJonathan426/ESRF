import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyLeagues } from '../../store/league';
import './HomePage.css';


const HomePage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const leagueState = useSelector(state => state.leagues)
    const myLeagues = Object.values(leagueState)

    const ownerId = sessionUser.id

    useEffect(() => {
        dispatch(getMyLeagues(ownerId))
    }, [dispatch, ownerId])


    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='home-action-background'></div>
            <div className='page-container'>
                <div className='home-action-container'>
                    <div className='home-title-container'>
                        <div className='home-logo-wrapper'>
                            <img className='home-league-logo' src='https://esrf.s3.amazonaws.com/Default-League-Logo.jpg' alt='league logo' />
                        </div>
                        <div className='home-title'>
                            Play the #1 Recreational Fantasy Game
                        </div>
                    </div>
                    <div className='home-action-boxes'>
                        <div className='action-box'>
                            <Link to='/leagues/new'>
                                <button className='home-link-btns'>Create a League</button>
                            </Link>
                            You're the league manager here. Set up a private <br /> league to play with your family and friends!
                        </div>
                        <div className='action-box join-box'>
                            <Link to='/leagues'>
                                <button className='home-link-btns'>Join a Public League</button>
                            </Link>
                            Hop into one of our public leagues and we will find people for you to play with!
                        </div>
                    </div>
                </div>
                {myLeagues ? (
                    <>
                        <div className='my-leagues-title'>My Leagues</div>
                        <div className='my-leagues-container'>
                            {myLeagues.map(league => (
                                <div key={league.id} className='my-league'>
                                    <Link to={`/leagues/${league.id}`}>
                                        <img className='my-leagues-logo' src={`${league.league_image}`} alt='league-logo' />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )
                    :
                    <h3>Loading...</h3>
                }
            </div>
        </div>
    )
}

export default HomePage;
