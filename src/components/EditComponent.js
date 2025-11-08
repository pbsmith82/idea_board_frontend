import React from 'react'
import {connect} from 'react-redux'
import {updateComponent} from '../actions/updateComponent'
import {fetchComponents} from '../actions/fetchComponents'
import '../css/modern.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'

class EditComponent extends React.Component {

    componentDidMount() {
        // Fetch components to get the current component data
        this.props.fetchComponents()
    }

    state = {
        name: ''
    }

    componentDidUpdate(prevProps) {
        // Update state when component data is loaded
        if (prevProps.components !== this.props.components) {
            const component = this.props.components.find(c => 
                String(c.id) === String(this.props.match.params.id)
            )
            if (component && component.attributes && !this.state.name) {
                this.setState({
                    name: component.attributes.name
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const componentData = {
            id: this.props.match.params.id,
            name: this.state.name
        }
        this.props.updateComponent(componentData).then(() => {
            // Refetch components to ensure we have the latest data
            this.props.fetchComponents()
            this.props.history.push('/components')
        }).catch(error => {
            // Error is already handled in updateComponent action
            console.error('Failed to update component:', error)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const component = this.props.components.find(c => 
            String(c.id) === String(this.props.match.params.id)
        )

        if (!component) {
            return (
                <div className="modern-container">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading component...</p>
                    </div>
                </div>
            )
        }

        return(
            <div className="modern-form-container">
                <div className="modern-page-header">
                    <h1 className="modern-page-title">
                        <i className="fas fa-puzzle-piece"></i>
                        Edit Component
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
                                value={this.state.name || component.attributes.name} 
                                name="name" 
                                placeholder="Enter component name..."
                                onChange={this.handleChange}
                                required
                            /> 
                        </div>
                        <div className="form-actions-modern">
                            <button type="submit" className="modern-btn modern-btn-success">
                                <i className="fas fa-save"></i>
                                <span>Save Changes</span>
                            </button>
                            <Link to={`/components`} className="modern-btn modern-btn-secondary">
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

export default compose(withRouter, connect(mapStateToProps, {updateComponent, fetchComponents}))(EditComponent)

