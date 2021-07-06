import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import React from 'react'
import {Link} from 'react-router-dom'




const Ideas = (props) => {


    return (
        <div className="container container-lg"> 
            <br/>
            <h1 className="display-5">Ideas</h1>
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
                    <div className="row row-cols-22"> 
                       <div> Likes: {idea.attributes.likes} </div>
                       <div align="right">
                       <Link to={`/ideas/${idea.attributes.id}`}>
                       <button className="btn btn-warning shadow-sm btn-sm"> Edit </button>
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



export default Ideas