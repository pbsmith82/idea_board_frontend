import React from 'react'
import {Link} from 'react-router-dom'
import '../css/modern.css'

const NavBar = (props) => {

    return (
        <nav className="modern-navbar">
           <div className="navbar-content">
            <Link to='/' className="navbar-brand">
                <i className="far fa-lightbulb"></i>
                <span>Idea Board</span>
            </Link>
            
            <div className="navbar-actions">
                <Link to='/ideas' className="modern-btn modern-btn-secondary">
                    <i className="fas fa-lightbulb"></i>
                    <span>Ideas</span>
                </Link>
                <Link to='/components' className="modern-btn modern-btn-secondary">
                    <i className="fas fa-puzzle-piece"></i>
                    <span>Components</span>
                </Link>
                <Link to='/mindmap' className="modern-btn modern-btn-secondary">
                    <i className="fas fa-project-diagram"></i>
                    <span>Mind Map</span>
                </Link>
                <Link to='/ideas/new' className="modern-btn modern-btn-success">
                    <i className="fas fa-plus"></i>
                    <span>Add Idea</span>
                </Link>
            </div>
            </div> 
        </nav>
    )

}

export default NavBar