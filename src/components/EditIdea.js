import React from 'react'
import {connect} from 'react-redux'
import {updateIdea} from '../actions/updateIdea'
import {fetchComponents} from '../actions/fetchComponents'
import '../css/modern.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'

class EditIdea extends React.Component {
    
    componentDidMount() {
        // Fetch components if not already loaded
        if (!this.props.components || this.props.components.length === 0) {
            this.props.fetchComponents()
        }
    }
    
    state = {
        title: this.props.idea.attributes.title,
        component_id: this.props.idea.relationships.component.data.id,
        description: this.props.idea.attributes.description,
        likes: this.props.idea.attributes.likes
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let idea = {...this.state, id: this.props.idea.id}
        this.props.updateIdea(idea)
        this.setState({
            title: '',
            component_id: '',
            description: '',
            likes: ''
        })
        this.props.history.push(`/ideas/${this.props.idea.id}`)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        return (
            <div className="modern-form-container">
                <div className="modern-page-header">
                    <h1 className="modern-page-title">
                        <i className="far fa-lightbulb"></i>
                        Edit Idea
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
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-actions-modern">
                            <button type="submit" className="modern-btn modern-btn-success">
                                <i className="fas fa-save"></i>
                                <span>Save Changes</span>
                            </button>
                            <Link to={`/ideas/${this.props.idea.id}`} className="modern-btn modern-btn-secondary">
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

export default compose(withRouter, connect(mapStateToProps, {updateIdea, fetchComponents}))(EditIdea)
