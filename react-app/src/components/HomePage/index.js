import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyLeagues } from '../../store/league';
import './HomePage.css';


const HomePage = () => {
    const dispatch = useDispatch();
    const leagueState = useSelector(state => state.leagues)
    const myLeagues = Object.values(leagueState)

    useEffect(() => {
        dispatch(getMyLeagues())
    }, [dispatch])


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
                        <div className='action-box create-box'>
                            test
                        </div>
                        <div className='action box join-box'>
                            test 2
                        </div>
                    </div>
                </div>
                {myLeagues.map(league => (
                    <div key={league.id}>
                        {league.league_name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;
