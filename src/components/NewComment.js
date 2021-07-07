import React from 'react'
import {connect} from 'react-redux'
import {sendComment} from '../actions/sendComment'
import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'

class NewComment extends React.Component {
    
    state = {

        idea_id: this.props.match.params.id,
        description: ''

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendComment(this.state)
        this.setState({
            ...this.state,
            description: ''
           
        })
        this.props.history.push(`/ideas/${this.state.idea_id}`)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        
        return(

            <div className="container" align="center"><br/>
                <h1 className="display-5"><i className="far fa-lightbulb" style={{color: '#ffc107'}}></i>&nbsp;&nbsp;Add Your Comment</h1>
                <form onSubmit={this.handleSubmit}>
                    <label hidden={true}>Comment: </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">Description:</span>
                        <textarea className="form-control" value={this.state.description} name="description" aria-label="description" aria-describedby="basic-addon3" onChange={this.handleChange}/>
                    </div>
                    <div className="row2 row-cols-22">
                        <div></div>
                        <div align="center">
                            <input type="Submit" className="btn btn-primary btn-sm" />
                            &nbsp;&nbsp;
                            <Link to={`/ideas`}>
                            <input type="button" value="Cancel" className="btn btn-danger shadow-sm btn-sm"/>
                            </Link>
                        </div>
                    </div>                
                </form>
            </div>

        )
    }

}

export default compose(withRouter, connect(null, {sendComment}))(NewComment)