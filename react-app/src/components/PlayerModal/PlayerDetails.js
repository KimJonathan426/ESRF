
import './PlayerDetails.css';

const PlayerDetails = ({ player }) => {

    return (
        <div className='player-details-container'>
            <div className='player-detail-box'>
                <div className='player-detail-image-container'>
                    <img src={`${player.player_image}`} alt='player'></img>
                    <div className='triangle'></div>
                </div>
                <div className='player-detail-info-container'>
                    <div className='detail-1'>
                        <div className='main-detail'>{player.player_name}</div>
                        {player.team ? (
                            <div className='sub-detail'>{player.team}</div>
                        )
                            :
                            <div className='sub-detail'>No Official Team</div>
                        }
                        <div className='minor-detail'>ELIG &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {player.position}</div>
                    </div>
                    <div className='detail-2'>
                        <div>Fantasy Points Total</div>
                        <div>{player.fantasy_total}</div>
                    </div>
                </div>
            </div>
            <div className='player-recent-box'>
                <div className='recent-bio-header'>Biography</div>
                {player.bio ? (
                    <div className='recent-bio-text'>{player.bio}</div>
                )
                    :
                    <div className='recent-bio-text'>There is no biography for <span>{player.player_name}</span></div>
                }
            </div>
            <div className='player-recent-box'>
                <div className='recent-bio-header'>Recent News</div>
                {player.recent_news ? (
                    <div className='recent-bio-text'>{player.recent_news}</div>
                )
                    :
                    <div className='recent-bio-text'>There is no recent new for {player.player_name}</div>
                }
            </div>
        </div>
    )
}

export default PlayerDetails
