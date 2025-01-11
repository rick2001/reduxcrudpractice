import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchDataFromNav } from '../redux/counter/counterSlice';

export const Navbar = () => {
    const allUsers = useSelector((state)=>state.counter.users);
    const [searchData, setSearchData] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (e)=>{  
        console.log(e.target.value);
        setSearchData(e.target.value)
    }

    useEffect(() => {  // what we are doing basically typing and sending the data at the same time in counter slice, the amount of time search data is hit, useffect will run and send the data to counterSlice reducer searchDataFromNav
      dispatch(searchDataFromNav(searchData));
    }, [searchData])
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/createpost">Create Post</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/">All Post ({allUsers.length})</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchData} onChange={handleSearch}/>
                    </form>
                </div>
            </nav>
        </div>
    )
}
