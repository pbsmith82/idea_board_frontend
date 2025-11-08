import React from 'react'
import {connect} from 'react-redux'
import {sendComment} from '../actions/sendComment'
import '../css/modern.css'
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
            <div className="modern-form-container">
                <div className="modern-page-header">
                    <h1 className="modern-page-title">
                        <i className="fas fa-comments"></i>
                        Add Your Comment
                    </h1>
                </div>
                <div className="modern-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group-modern">
                            <label className="form-label-modern" htmlFor="description">
                                <i className="fas fa-align-left" style={{marginRight: '0.5rem'}}></i>
                                Comment
                            </label>
                            <textarea 
                                className="form-textarea-modern" 
                                value={this.state.description} 
                                name="description" 
                                placeholder="Share your thoughts..."
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-actions-modern">
                            <button type="submit" className="modern-btn modern-btn-success">
                                <i className="fas fa-paper-plane"></i>
                                <span>Post Comment</span>
                            </button>
                            <Link to={`/ideas`} className="modern-btn modern-btn-secondary">
                                <i className="fas fa-times"></i>
                                <span>Cancel</span>
                            </Link>
                        </div>                
                    </form>
                </div>
            </div>
        )
    }
}

export default compose(withRouter, connect(null, {sendComment}))(NewComment)
