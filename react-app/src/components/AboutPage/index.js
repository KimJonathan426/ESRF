import './AboutPage.css'

const AboutPage = () => {

    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='home-action-background'></div>
            <div className='page-container'>
                <div className='about-description'>
                    <div className='about-header'>
                        Welcome to ESRF!
                    </div>
                    <div className='about-text-1'>
                        This project is clone of ESPN Fantasy Basketball. However, the difference is that this
                        fantasy app is fully custom customizable and not only limited to NBA games and players.
                        Users can make fantasy leagues for recreational leagues, tournaments, pick-up games, and more.
                        They can track their stats and compete against one another. This adds another layer of fun to
                        both the players and spectators.
                    </div>
                    <div className='about-text-2'>
                        Thank you for taking the time to visit my site!
                    </div>
                </div>
                <div className='about-me-container'>
                    <div className='about-me'>
                        <div className='my-image'>
                            <img className='about-image' src='https://media-exp1.licdn.com/dms/image/C4D03AQFmy3MqHiWloQ/profile-displayphoto-shrink_800_800/0/1613671537681?e=1660780800&v=beta&t=faPlh0ayVNYxdm48UztCTHdUen2lCv-XY1GxeStze4M' />
                        </div>
                        <div className='info-container'>
                                <div className='info-title'>
                                    Jonathan Kim<br />
                                    Kim.Jonathan426@gmail.com
                                </div>
                            <div className='about-links'>
                                <div className='linked-in'>
                                    <a href="https://www.linkedin.com/in/kimjonathan426" target='_blank'>
                                        <img className='linked-in-link' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" />
                                    </a>
                                </div>
                                <div className='github-repo'>
                                    <a href="https://github.com/KimJonathan426/AirBall-n-Brick" target='_blank'>
                                        <img className='github-link' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
                                    </a>
                                </div>
                            </div>
                            <div className='about-tech-container'>
                                <h4>React/Redux</h4>
                                <h4>NodeJS</h4>
                                <h4>Flask-SQLAlchemy</h4>
                                <h4>Python</h4>
                                <h4>PostgreSQL</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AboutPage;