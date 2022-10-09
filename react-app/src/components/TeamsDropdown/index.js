import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TeamsDropdown.css"

const TeamsDropdown = ({ sessionUser, teamsList }) => {
    const { leagueId } = useParams();
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => {
        setDropdown(!dropdown);
    }

    return (
        <div className={dropdown ? "nav-list clicked" : "nav-list"} onClick={handleClick}>
            <ul className='teams-list-dropdown'>
                {teamsList.map(team =>
                    team.team_owner_id !== sessionUser.id &&
                    <li key={team.id} className='dropdown-item-team'>
                        <Link className='dropdown-link-team' to={`/leagues/${leagueId}/teams/${team.team_number}`} onClick={handleClick}>
                            <div className='opposing-teams-box'>
                                <div className='opposing-teams-image-box'>
                                    <div className='opposing-logos-box'>
                                        <img className='opposing-teams-logo' src={team.team_image} alt='team logo' />
                                    </div>
                                </div>
                                <div className='opposing-teams-info'>
                                    <div className='opposing-teams-name-abre'>
                                        <div className='opposing-teams-name'>{team.team_name}</div>
                                        <span className='opposing-teams-abre'>({team.team_abre})</span>
                                    </div>
                                    <div className='opposing-teams-user'>{team.team_owner.username}</div>
                                </div>
                            </div>
                        </Link>
                    </li>
                )}
            </ul>

        </div>

    )

}

export default TeamsDropdown;
