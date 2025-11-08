import '../css/modern.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteComponent} from '../actions/deleteComponent'
import {fetchComponents} from '../actions/fetchComponents'

class Components extends React.Component {

    componentDidMount() {
        // Fetch components when component mounts
        this.props.fetchComponents()
    }

    handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete the component "${name}"? This action cannot be undone.`)) {
            this.props.deleteComponent(id).then(() => {
                this.props.fetchComponents()
            }).catch(error => {
                console.error('Failed to delete component:', error)
            })
        }
    }

    render() {
        const { components } = this.props

        if (!components || components.length === 0) {
            return (
                <div className="modern-container">
                    <div className="modern-page-header">
                        <h1 className="modern-page-title">
                            <i className="fas fa-puzzle-piece"></i>
                            Components
                        </h1>
                    </div>
                    <div className="empty-state">
                        <i className="fas fa-puzzle-piece"></i>
                        <h3>No components yet</h3>
                        <p>Start by creating your first component!</p>
                        <Link 
                            to={{ pathname: "/components/new", state: { from: 'components' } }}
                            className="modern-btn modern-btn-success" 
                            style={{marginTop: '1rem'}}
                        >
                            <i className="fas fa-plus"></i>
                            <span>Create Your First Component</span>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div className="modern-container"> 
                <div className="modern-page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                    <h1 className="modern-page-title" style={{margin: 0}}>
                        <i className="fas fa-puzzle-piece"></i>
                        Components
                    </h1>
                    <Link 
                        to={{ pathname: "/components/new", state: { from: 'components' } }}
                        className="modern-btn modern-btn-success"
                    >
                        <i className="fas fa-plus"></i>
                        <span>Add Component</span>
                    </Link>
                </div>
                <div className="modern-card-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}> 
                    {components.map(component => {
                    if (!component || !component.attributes) {
                        return null;
                    }
                    
                    return (
                    <div key={component.id} className="modern-card">
                        <div className="card-header-modern">
                            <div className="card-icon-wrapper" style={{background: 'var(--accent-gradient)'}}>
                                <i className="fas fa-puzzle-piece"></i>
                            </div>
                            <h3 className="card-title">
                                {component.attributes.name}
                            </h3>
                        </div>
                        <div className="card-footer-modern" style={{justifyContent: 'center'}}>
                            <div className="card-actions">
                                <Link to={`/components/${component.id}/edit`} className="btn-modern-sm btn-modern-edit">
                                    <i className="fas fa-edit"></i>
                                    <span>Edit</span>
                                </Link>
                                <button 
                                    onClick={() => this.handleDelete(component.id, component.attributes.name)}
                                    className="btn-modern-sm" 
                                    style={{
                                        background: 'rgba(244, 67, 54, 0.15)',
                                        color: '#f44336',
                                        border: '1px solid rgba(244, 67, 54, 0.3)',
                                        fontWeight: 600
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    );
                    })}
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

export default connect(mapStateToProps, {deleteComponent, fetchComponents})(Components)

