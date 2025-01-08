import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser, deleteUser } from '../redux/counter/counterSlice';
import { CustomModal } from './CustomModal';
import { Link } from 'react-router-dom';


export const Home = () => {
    const dispatch = useDispatch();  // creating object of the useDispatch hook
    const { users, loading } = useSelector((state) => state.counter);
    const [showPopUp, setShowPopUp] = useState(false);
    const [id, setId] = useState();

    useEffect(() => {
        dispatch(showUser());  // calling the show userfunction when the website is loading
    }, [])

    if (loading) {
        return (<h2>Loading......</h2>)
    }

    const handleViewButton=(id)=>{
        setId(id);
        setShowPopUp(true);
        
    }

    const handleDeleteButton=(id)=>{
        dispatch(deleteUser(id));
        
    }
    return (
        <>
        {showPopUp && <CustomModal id={id} showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>}
            <div className="container text-center">
                <h1>All Data</h1>
                <div>
                    {
                        users.length > 0 ? (
                            users.map((user, index) => (
                                <div key={user.id} class="card my-2">
                                    <div class="card-body">
                                        <h5 class="card-title">{user.name}</h5>
                                        <p class="card-text">{user.email}</p>
                                        <p class="card-text">{user.age}</p>
                                        <p class="card-text">{user.gender}</p>
                                        {/* taking the id of the user */}
                                        <button class="btn btn-primary mx-2" onClick={()=>handleViewButton(user.id)}>View</button>
                                        <Link to={`/update/${user.id}`} class="btn btn-primary mx-2">Edit</Link>
                                        <button class="btn btn-primary mx-2" onClick={()=>handleDeleteButton(user.id)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No User Found</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}
