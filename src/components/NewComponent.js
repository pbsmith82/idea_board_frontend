import React from 'react'
import {connect} from 'react-redux'
import {sendComponent} from '../actions/sendComponent'
import {fetchComponents} from '../actions/fetchComponents'
import '../css/modern.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'

class NewComponent extends React.Component {

    componentDidMount() {
        // Fetch components to ensure we have the latest list
        this.props.fetchComponents()
    }

    state = {
        name: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendComponent(this.state).then(() => {
            // Refetch components to ensure we have the latest data
            this.props.fetchComponents()
            this.setState({
                name: ''
            })
            // Redirect based on where we came from
            const from = this.props.location.state?.from || 'ideas'
            this.props.history.push(from === 'components' ? '/components' : '/ideas/new')
        }).catch(error => {
            // Error is already handled in sendComponent action
            console.error('Failed to save component:', error)
        })
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
                        <i className="fas fa-puzzle-piece"></i>
                        Create New Component
                    </h1>
                </div>
                <div className="modern-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group-modern">
                            <label className="form-label-modern" htmlFor="name">
                                <i className="fas fa-tag" style={{marginRight: '0.5rem'}}></i>
                                Component Name
                            </label>
                            <input 
                                type='text' 
                                id="name"
                                className="form-input-modern" 
                                value={this.state.name} 
                                name="name" 
                                placeholder="Enter component name (e.g., Dashboard, Settings, Profile)..."
                                onChange={this.handleChange}
                                required
                            /> 
                        </div>
                        <div className="form-actions-modern">
                            <button type="submit" className="modern-btn modern-btn-success">
                                <i className="fas fa-plus"></i>
                                <span>Create Component</span>
                            </button>
                            <Link to={`/ideas/new`} className="modern-btn modern-btn-secondary">
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

export default compose(withRouter, connect(null, {sendComponent, fetchComponents}))(NewComponent)

