import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionAddLeague } from '../../store/league';
import ErrorModal from '../ErrorModal';
import './LeagueImageUpload.css'


const LeagueImageUpload = ({ leagueId }) => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [showErrorModal, setShowErrorModal] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsArray = [];
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/leagues/image/${leagueId}`, {
            method: "POST",
            body: formData,
        });

        const imageUploadLeague = await res.json();

        if (imageUploadLeague && imageUploadLeague.errors === undefined) {
            setImageLoading(false);
            dispatch(actionAddLeague(imageUploadLeague))
        }
        else if (imageUploadLeague.errors) {
            errorsArray.push(imageUploadLeague.errors)
            setErrors(errorsArray)
            setShowErrorModal(true);
            setImageLoading(false);
        }
        else {
            errorsArray.push('Unknown error, please refresh and try again.')
            setErrors(errorsArray)
            setShowErrorModal(true);
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={errors} />
            <div className='league-image-upload-container'>

                <label className="league-image-label" htmlFor="league-image-file">Update League Logo</label>
                <input
                    className='league-image-edit-input'
                    id="league-image-file"
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

export default LeagueImageUpload;
