import { Link } from 'react-router-dom';
import './AccessDenied.css'

const AccessDenied = ({ leagueId }) => {

    return (
        <div className='forbidden-container'>
            <img className='forbidden-image' src='https://g.espncdn.com/lm-static/fba/images/error-404.svg' alt='basketball missing hoop'/>
            <div className='forbidden-message'>
                You do not have permission to view this page.
            </div>
            <div className='forbidden-link'>
                <span>Go to the </span><Link to={`/leagues/${leagueId}`}>League Home Page</Link>
            </div>
        </div>
    )
}

export default AccessDenied;
