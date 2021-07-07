import React from 'react'
import {Link} from 'react-router-dom'
import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import Comments from './Comments'


const Idea = (props) => {
    
    let idea = props.ideas.filter(idea => idea.attributes.id === parseInt(props.match.params.id))[0]
    
    
    return (
        <div className="container" align="center"> <br/>
            <h1 className="display-5"><i className="far fa-lightbulb" style={{color: '#ffc107'}}></i> {idea.attributes.title} </h1>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Component:</span>
                <input type='text' className="form-control" value={idea.attributes.component_name} name="component_id" aria-label="component" aria-describedby="basic-addon2" disabled readonly />                     
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">Description:</span>
                <textarea className="form-control" value={idea.attributes.description} name="description" aria-label="description" aria-describedby="basic-addon3" disabled readonly/>
            </div>
            <div className="row2 row-cols-22">
                <div> 
                    <i class="far fa-thumbs-up fa-2x" style={{color: '#ffc107'}}></i>&nbsp;&nbsp; {idea.attributes.likes} &nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-comments fa-2x" style={{color: '#ffc107'}}></i>&nbsp;&nbsp; {idea.relationships.comments.data.length} 
                </div>
                <div align="center">
                    <Link to={`/ideas/${idea.attributes.id}/edit`}>
                    <button className="btn btn-warning shadow-sm btn-sm"> Edit </button>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={`/ideas`}>
                    <button className="btn btn-danger shadow-sm btn-sm"> Cancel </button>
                    </Link>
                </div>
            </div><br/><br/><br/><br/>
            <Comments idea={idea}/>
        </div>        
    )
    
}


export default Idea