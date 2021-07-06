import React from 'react'
//import { Redirect } from 'react-router'

const Idea = (props) => {

    let idea = props.ideas.filter(idea => idea.attributes.id === parseInt(props.match.params.id))[0]
    console.log(idea)
    

    
    return (
        <div>
            <h1>TITLE: {idea.attributes.title}</h1>
            <p> Description: {idea.attributes.description} </p>
        </div>

    )

}

export default Idea