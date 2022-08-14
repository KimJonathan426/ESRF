import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteLeague } from "../../store/league";

const DeleteLeagueModal = ({ leagueId }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const onDelete = async () => {
        await dispatch(deleteLeague(leagueId));
    }

    return (
        <>
            <button className='delete-btn' onClick={() => setShowModal(true)}>Delete League</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <h2>Delete Confirmation</h2>
                    </div>
                    <div>
                        <div>Are you sure you want to remove this league?</div>
                    </div>
                    <div>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                    <div>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default DeleteLeagueModal;
