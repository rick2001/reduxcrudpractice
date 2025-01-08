import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
export const UpdateData = () => {
    const { users, loading } = useSelector((state) => state.counter.users)
    const { id } = useParams();  // using this I took the id from the url

    const [editData, setEditData] = useState({ name: "", email: "", age: "", gender: "" });

    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele) => ele.id === id);
            setEditData
        }
    }, [])

    return (
        <div className='container my-3'>
            <h1 className='text-center'>Edit Data</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name='email' />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="text" className="form-control" id="age" name='age' />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>
                </div>


            </form>
            <button type="submit" className="btn btn-primary" >Save</button>
        </div>
    )
}
