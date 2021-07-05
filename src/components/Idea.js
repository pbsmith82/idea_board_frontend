import React from 'react'
import { Redirect } from 'react-router'

const Idea = (props) => {

    let idea = props.ideas.filter(idea => idea.attributes.id === props.match.params.id)[0]

    return (
        <div>
            <h1>TITLE: {idea ? idea.attributes.title : null}</h1>
            <p> Description: {idea.attributes.description} </p>
        </div>

    )

}

export default Idea