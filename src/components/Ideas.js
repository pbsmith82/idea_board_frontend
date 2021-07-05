import '../css/bootstrap.css'
import React from 'react'
import {Route, Link} from 'react-router-dom'
//import Idea from './Idea'

const Ideas = (props) => {
 console.log(props.ideas)
    return (
        <div className="row row-cols-3"> 
            {props.ideas.map(idea =>
            <div>
            <div key={idea.attributes.id} className="card-header">
                {idea.attributes.title}
                {console.log(idea.attributes.title)}
            </div>
            <div className="card-body">
                {idea.attributes.description}
            </div>
            <div className="card-footer">
                {idea.attributes.likes}
            </div>
            </div>

            )}

        </div>

    )

}

export default Ideas