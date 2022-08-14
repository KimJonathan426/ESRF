import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionAddPlayer } from '../../store/player';
import ErrorModal from '../ErrorModal';
import './PlayerImageUpload.css'


const PlayerImageUpload = ({ playerId }) => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsArray = [];
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/players/image/${playerId}`, {
            method: "POST",
            body: formData,
        });

        const imageUploadPlayer = await res.json();

        if (imageUploadPlayer && imageUploadPlayer.errors === undefined) {
            setImageLoading(false);
            dispatch(actionAddPlayer(imageUploadPlayer))
        }
        else if (imageUploadPlayer.errors) {
            errorsArray.push(imageUploadPlayer.errors)
            setErrors(errorsArray)
            setShowModal(true);
            setImageLoading(false);
        }
        else {
            errorsArray.push('Unknown error, please refresh and try again.')
            setErrors(errorsArray)
            setShowModal(true);
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowModal(false)} showErrorModal={showModal} validationErrors={errors} />
            <div className='player-image-upload-container'>

                <label className="player-image-label" htmlFor={`player-image-file-${playerId}`}>Update Player Photo</label>
                <input
                    className='player-image-edit-input'
                    id={`player-image-file-${playerId}`}
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />

                {imageLoading ? <div>Uploading...</div>
                    :
                    <button className='upload-btn' type="submit">Upload</button>
                }
            </div>
        </form>
    )
}

export default PlayerImageUpload;
