import React from 'react'
import {Link} from 'react-router-dom'
import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'


const Comments = (props) => {
    
     let idea = props.idea
    
    
   return (
        <div className="container" align="center"> <br/>
            <div className='row-com'>
                <div className="col"><h1 className="display-7">Comments:</h1></div>
                <div className="col-6"></div>
                <div className="col">
                    <Link to={`${idea.id}/comments/new`}>
                    <button className="btn btn-success shadow-sm btn-sm"> Add Comment </button>
                    </Link>
                </div>
            </div>
            {idea.attributes.comments.map(comment => 
            <div key={comment.id} className="card border-info mb-3 shadow">
                <div className="row">
               <div className="col" align="left" >&nbsp; <i className="fas fa-comments fa-lg"></i></div>
               <div className="col-6"> {comment.description} </div>
               <div className="col"></div>
                </div>
                </div>
            )}
        </div>        
    )
    
}


export default Comments