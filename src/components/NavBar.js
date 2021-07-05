import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
           <div className="container-fluid">
            <div className="navbar-brand"> <i className="fas fa-project-diagram"></i> Idea Board v1.0 </div>
                <Link to='/ideas' style={{paddingRight: '10px'}}> Ideas </Link>
                <Link to='/ideas/new'> Add Idea </Link>
            </div> 
        </nav>
    )

}

export default NavBar