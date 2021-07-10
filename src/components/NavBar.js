import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {

    return (
        <nav className="navbar sticky-top navbar-dark bg-dark">
           <div className="container-fluid">
            <div className="navbar-brand" style={{color: '#ffc107'}}> <Link to='/' className="link-warning"><i className="far fa-lightbulb" style={{color: '#ffc107'}}></i> Idea Board v1.0 </Link> </div>
            
                <Link to='/ideas' style={{paddingRight: '10px'}}><button className="btn btn-warning btn-sm"> Ideas </button> </Link>
                <Link to='/ideas/new'><button className="btn btn-success btn-sm"> Add Idea </button></Link>
            </div> 
        </nav>
    )

}

export default NavBar