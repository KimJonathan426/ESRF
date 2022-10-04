import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionAddTeam } from '../../store/team';
import ErrorModal from '../ErrorModal';
import './TeamImageUpload.css'


const TeamImageUpload = () => {
    const { leagueId, teamNumber } = useParams();
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

        const res = await fetch(`/api/leagues/${leagueId}/teams/${teamNumber}/image`, {
            method: "POST",
            body: formData,
        });

        const imageUploadTeam = await res.json();

        if (imageUploadTeam && imageUploadTeam.errors === undefined) {
            setImageLoading(false);
            dispatch(actionAddTeam(imageUploadTeam))
        }
        else if (imageUploadTeam.errors) {
            errorsArray.push(imageUploadTeam.errors)
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
        <form className='team-image-upload-form' onSubmit={handleSubmit}>
            <ErrorModal hideModal={() => setShowErrorModal(false)} showErrorModal={showErrorModal} validationErrors={errors} />
            <div className='team-image-upload-container'>

                <label className="team-image-label" htmlFor="team-image-file">Update Team Logo</label>
                <input
                    className='team-image-edit-input'
                    id="team-image-file"
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

export default TeamImageUpload;
