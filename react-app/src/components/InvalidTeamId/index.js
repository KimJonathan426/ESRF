import { Link } from 'react-router-dom';
import './InvalidTeamId.css'

const InvalidTeamId = ({ leagueId }) => {

    return (
        <div className='Invalid-container'>
            <img className='Invalid-image' src='https://g.espncdn.com/lm-static/fba/images/error-404.svg' alt='basketball missing hoop'/>
            <div className='Invalid-message'>
                Invalid Team ID.
            </div>
            <div className='Invalid-link'>
                <span>Go to the </span><Link to={`/leagues/${leagueId}`}>League Home Page</Link>
            </div>
        </div>
    )
}

export default InvalidTeamId;
