import React from 'react'
import {connect} from 'react-redux'
import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import { sendLike } from '../actions/sendLike' 


class Likes extends React.Component {

    state = {

        id: this.props.idea.id,
        likes: this.props.idea.attributes.likes 

    }


    handleclick = (e) => {
        e.preventDefault()
        let idea = {...this.state, likes: this.props.idea.attributes.likes+1}
        this.props.sendLike(idea)
        this.setState({
            id: this.props.idea.id,
            likes: this.props.idea.attributes.likes + 1
        })
        
        this.props.history.push('/ideas')
    }




    render() {
        return(

            <div> 
                <button className="btn btn-outline-dark btn-sm" onClick={this.handleclick}> 
                    <i className="far fa-thumbs-up fa-2x" style={{color: '#ffc107'}}/> 
                </button> &nbsp;&nbsp; {this.props.idea.attributes.likes} 
            </div>

        )
    }

}

export default compose(withRouter, connect(null, {sendLike}))(Likes)