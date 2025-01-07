import React from 'react'
import "./CustomModal.css";
import { useSelector } from 'react-redux';
export const CustomModal = ({ id, showPopUp, setShowPopUp }) => {
    const allUsers = useSelector((state) => state.counter.users);
    const singleUser = allUsers.filter((ele) => ele.id === id);  // basically filtering the id we want
    console.log(singleUser);
    const handlePopUp = () => {
        setShowPopUp(false);
    }
    return (
        <div className='modalBackground'>
            <div className="modalContainer">
                <h1>CustomModal</h1>
                <h3>{singleUser[0].name}</h3>
                <h3>{singleUser[0].email}</h3>
                <h3>{singleUser[0].age}</h3>
                <h3>{singleUser[0].gender}</h3>
                <button className='btn btn-primary' onClick={handlePopUp}>Close</button>
            </div>
        </div>
    )
}
