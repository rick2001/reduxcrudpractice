import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../redux/counter/counterSlice';
import { useNavigate } from 'react-router-dom';

export const CreateForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", age: "", gender: "" })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleOnClick = () => {
        console.log(formData);
        dispatch(createUser(formData));
        navigate("/")
    }
    return (
        <div className='container my-3'>
            <h1 className='text-center'>Add Data</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={handleOnChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={handleOnChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="text" className="form-control" id="age" name='age' onChange={handleOnChange} />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={handleOnChange} />
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={handleOnChange} />
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>
                </div>


            </form>
            <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
        </div>
    )
}
