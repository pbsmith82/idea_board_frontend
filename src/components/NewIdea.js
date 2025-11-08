import React from 'react'
import {connect} from 'react-redux'
import {sendIdea} from '../actions/sendIdea'
import {fetchIdeas} from '../actions/fetchIdeas'
import {fetchComponents} from '../actions/fetchComponents'
import '../css/modern.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'

class NewIdea extends React.Component {

    componentDidMount() {
        // Fetch components if not already loaded
        if (!this.props.components || this.props.components.length === 0) {
            this.props.fetchComponents()
        }
    }

    state = {

        title: '',
        component_id: '',
        description: '',
        likes: 1,
        dislikes: 0

    }

    handleSubmit = (e) => {
        e.preventDefault()
        // Convert component_id to integer if it's not empty
        const ideaData = {
            ...this.state,
            component_id: this.state.component_id ? parseInt(this.state.component_id) : null
        }
        this.props.sendIdea(ideaData).then(() => {
            // Refetch ideas to ensure we have the latest data
            this.props.fetchIdeas()
            this.setState({
                title: '',
                component_id: '',
                description: '',
                likes: 1,
                dislikes: 0
            })
            this.props.history.push('/ideas')
        }).catch(error => {
            // Error is already handled in sendIdea action
            console.error('Failed to save idea:', error)
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
                        <i className="far fa-lightbulb"></i>
                        Add Your Idea
                    </h1>
                </div>
                <div className="modern-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group-modern">
                            <label className="form-label-modern" htmlFor="title">
                                <i className="fas fa-heading" style={{marginRight: '0.5rem'}}></i>
                                Idea Title
                            </label>
                            <input 
                                type='text' 
                                id="title"
                                className="form-input-modern" 
                                value={this.state.title} 
                                name="title" 
                                placeholder="Enter a catchy title for your idea..."
                                onChange={this.handleChange}
                                required
                            /> 
                        </div>
                        <div className="form-group-modern">
                            <label className="form-label-modern" htmlFor="component_id">
                                <i className="fas fa-puzzle-piece" style={{marginRight: '0.5rem'}}></i>
                                Component
                            </label>
                            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-end'}}>
                                <select 
                                    className="form-select-modern" 
                                    value={this.state.component_id} 
                                    id="component_id"
                                    name="component_id" 
                                    onChange={this.handleChange}
                                    required
                                    style={{flex: 1}}
                                >
                                    <option value="">Choose a component...</option>
                                    {this.props.components && this.props.components.map(component => (
                                        <option key={component.id} value={component.id}>
                                            {component.attributes.name}
                                        </option>
                                    ))}
                                </select>
                                <Link 
                                    to={{ pathname: "/components/new", state: { from: 'ideas' } }}
                                    className="modern-btn modern-btn-secondary" 
                                    style={{padding: '0.75rem 1rem', whiteSpace: 'nowrap'}}
                                >
                                    <i className="fas fa-plus"></i>
                                    <span>New</span>
                                </Link>
                            </div>
                        </div>
                        <div className="form-group-modern">
                            <label className="form-label-modern" htmlFor="description">
                                <i className="fas fa-align-left" style={{marginRight: '0.5rem'}}></i>
                                Description
                            </label>
                            <textarea 
                                className="form-textarea-modern" 
                                value={this.state.description} 
                                name="description" 
                                placeholder="Describe your idea in detail..."
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-actions-modern">
                            <button type="submit" className="modern-btn modern-btn-success">
                                <i className="fas fa-paper-plane"></i>
                                <span>Submit Idea</span>
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

const mapStateToProps = state => {
    return {
        components: state.components || []
    }
}

export default compose(withRouter, connect(mapStateToProps, {sendIdea, fetchIdeas, fetchComponents}))(NewIdea)