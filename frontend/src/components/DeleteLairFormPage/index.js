import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeSpot } from '../../store/spots'
import Footer from '../Footer/index'
import './DeleteLairFormPage.css'


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
        <>
            <div className="delete-form-wrapper">
                <h1>Delete Lair</h1>
                <div className="delete-form-body">
                    <p>Are you sure you want to delete this Lair?</p>
                    <button className="lair-delete-form-button" onClick={handleCancelClick}>Cancel</button>
                    <button className="lair-delete-form-button" onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DeleteLairFormPage;