import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import React from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Likes from './Likes'





const Ideas = (props) => {

    return (
        <div className="container container-lg"> 
            <br/>
            <h1 className="display-5"><i className="far fa-lightbulb" style={{color: '#ffc107'}}></i>&nbsp;&nbsp;Ideas</h1>
            <div className="row row-cols-2"> 
                {props.ideas.map(idea =>
                <div key={idea.id}>
                    <div key={idea.attributes.id} className="card-header shadow  bg-light">
                    <h3 className="display-7"> <i className="far fa-lightbulb" style={{color: '#ffc107'}}></i> {idea.attributes.title}</h3>
                    </div>
                    <div className="card-body shadow  ">
                        {idea.attributes.description}
                    </div>
                    <div className="card-footer shadow  bg-light">
                    <div className="row row-cols-33"> 
                       {/* <div> <button className="btn btn-outline-dark shadow-sm btn-sm"> <i className="far fa-thumbs-up fa-2x" style={{color: '#ffc107'}}/> </button>&nbsp;&nbsp; {idea.attributes.likes} </div> */}
                       <Likes idea={idea} />
                       <div> <i className="fas fa-comments fa-2x" style={{color: '#ffc107'}}></i>&nbsp;&nbsp; {idea.relationships.comments.data.length} </div>
                       <div align="right">
                       <Link to={`/ideas/${idea.attributes.id}/edit`}>
                       <button className="btn btn-warning shadow-sm btn-sm"> Edit </button>
                       </Link>
                       <Link to={`/ideas/${idea.attributes.id}`}>
                       <button className="btn btn-primary shadow-sm btn-sm"> View </button>
                       </Link>
                       </div>
                    </div>
                    </div>
                </div>

                )}
            </div>
        </div>

    )

}



export default withRouter(Ideas)