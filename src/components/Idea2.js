import React from 'react'
import EditIdea from './EditIdea'

const Idea2 = (props) => {

    let idea = props.ideas.filter(idea => idea.attributes.id === parseInt(props.match.params.id))[0]
    
    
    return (
        <div>
           <EditIdea idea={idea}/>
        </div>
    )

}


export default Idea2