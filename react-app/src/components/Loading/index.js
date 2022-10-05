import basketballLoading from '../../images/Basketball-Loading.gif';
import './Loading.css';

const Loading = () => {

    return (
        <>
            <div className='loading-container'>
                <img className='loading-gif' src={basketballLoading} alt='bouncing basketball' />
            </div>
        </>
    )
}

export default Loading;
