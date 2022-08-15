import { Link } from 'react-router-dom';
import './PageNotFound.css'

const PageNotFound = () => {

    return (
        <div className='page-outer'>
            <div className='page-spacer'></div>
            <div className='home-action-background'></div>
            <div className='page-container'>
                <div className='not-found-container'>
                    <h1>
                        404 Page Not Found
                    </h1>
                    <h4>
                        *Whistle* Travel!!!
                    </h4>
                    <h4>
                        You traveled to a non-existent page.
                        Avoid this violation by going to a valid path!
                    </h4>
                    <h4>
                        Go back <Link to='/'>home</Link>
                    </h4>
                    <img className='travel-image' src='https://cdn.vox-cdn.com/thumbor/ij0Ng1FcLNz0sjQV6DWRVanCWjc=/0x294:2775x2144/1400x1050/filters:focal(0x294:2775x2144):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45568342/459394688.0.jpg'></img>
                </div>
            </div>
        </div>


    )
}

export default PageNotFound;
