import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser, deleteUser } from '../redux/counter/counterSlice';
import { CustomModal } from './CustomModal';
import { Link } from 'react-router-dom';


export const Home = () => {
    const dispatch = useDispatch();  // creating object of the useDispatch hook
    const { users, loading, searchData } = useSelector((state) => state.counter);
    const [showPopUp, setShowPopUp] = useState(false);
    const [id, setId] = useState();
    const [radioData, setRadioData] = useState(""); // button for male and female selection

    useEffect(() => {
        dispatch(showUser());  // calling the show userfunction when the website is loading
    }, [])

    if (loading) {
        return (<h2>Loading......</h2>)
    }

    const handleViewButton = (id) => {
        setId(id);
        setShowPopUp(true);

    }

    const handleDeleteButton = (id) => {
        dispatch(deleteUser(id));

    }

    const handleRadioChange = (e) => {
        console.log(e.target.value);
        setRadioData(e.target.value);
    }
    return (
        <>
            {showPopUp && <CustomModal id={id} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
            <div className="container text-center">
                <h1>All Data</h1>
                {/* All */}
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="all" value="" checked={radioData === ""} onChange={handleRadioChange} />
                    <label className="form-check-label" htmlFor="all">
                        All
                    </label>
                </div>


                {/* male */}
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={radioData === "male"} onChange={handleRadioChange} />
                    <label className="form-check-label" htmlFor="male">
                        Male
                    </label>
                </div>

                {/* female */}
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={radioData === "female"} onChange={handleRadioChange} />
                    <label className="form-check-label" htmlFor="female">
                        Female
                    </label>
                </div>
                <div>
                    {
                        users.length > 0 ? (
                            // it is basicaaly for searching
                            users.filter((ele) => {
                                if (searchData.length === 0) {  // logic: if the searchLength has a length 0 the simple return everything means we have not typed anything in search bar
                                    return ele;
                                }
                                else { // logic: if we have search something in searchbar, then compare that object name with the search data, if its matching then simply return that
                                    // both returns same thing
                                    // if(ele.name.toLowerCase().includes(searchData.toLowerCase())){
                                    //     return ele;
                                    // }
                                    return ele.name.toLowerCase().includes(searchData.toLowerCase());
                                }
                            })

                            // this filter is basically for gender
                            .filter((ele)=>{   // logic: if the radioData variable has a value "male", then simply check that object gender...if the value is male then simply return that element
                                if(radioData==="male"){
                                    return ele.gender === "male";
                                }
                                else if(radioData==="female"){ // logic: if the radioData variable has a value "female", then simply check that object gender...if the value is female then simply return that element
                                    return ele.gender === "female"
                                }
                                else{  // logic: if none of the logic is matching then simply return the element itself
                                    return ele;
                                }

                            })
                                .map((user, index) => (
                                    <div key={user.id} className="card my-2">
                                        <div className="card-body">
                                            <h5 className="card-title">{user.name}</h5>
                                            <p className="card-text">{user.email}</p>
                                            <p className="card-text">{user.age}</p>
                                            <p className="card-text">{user.gender}</p>
                                            {/* taking the id of the user */}
                                            <button className="btn btn-primary mx-2" onClick={() => handleViewButton(user.id)}>View</button>
                                            <Link to={`/update/${user.id}`} className="btn btn-primary mx-2">Edit</Link>
                                            <button className="btn btn-primary mx-2" onClick={() => handleDeleteButton(user.id)}>Delete</button>
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
