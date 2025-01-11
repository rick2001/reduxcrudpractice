import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { updateUser } from '../redux/counter/counterSlice';
export const UpdateData = () => {
    const { users, loading } = useSelector((state) => state.counter)
    const { id } = useParams();  // using this I took the id from the url
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editData, setEditData] = useState({id:"", name: "", email: "", age: "", gender: "" });

    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele)=>ele.id===id);
            console.log(singleUser);   
            setEditData({
                id: singleUser[0].id,
                name: singleUser[0].name,
                email: singleUser[0].email,
                age: singleUser[0].age,
                gender: singleUser[0].gender

            })
        }
    }, [])
    

    const handleOnChange = (e)=>{
        setEditData({...editData, [e.target.name]:e.target.value})
    }

    const handleEditData=()=>{
        console.log("Clicking on handle save data");
        dispatch(updateUser(editData));
        navigate("/");
    }

    return (
        <div className='container my-3'>
            <h1 className='text-center'>Edit Data</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name='name' value={editData.name} onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name='email' value={editData.email} onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="text" className="form-control" id="age" name='age' value={editData.age} onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={editData.gender==="male"} onChange={handleOnChange}/>
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={editData.gender==="female"} onChange={handleOnChange} />
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>
                </div>


            </form>
            <button type="submit" className="btn btn-primary" onClick={handleEditData} >Save</button>
        </div>
    )
}
