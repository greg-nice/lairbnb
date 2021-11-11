import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeSpot } from '../../store/spots'


function DeleteLairFormPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`);
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(removeSpot(spotId));
        history.push(`/`);
    }

    return (
        <div>
            <h1>Delete Lair</h1>
            <p>Are you sure you want to delete this Lair?</p>
            <button onClick={handleCancelClick}>Cancel</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
}

export default DeleteLairFormPage;