import '../css/modern.css'
import React from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Likes from './Likes'

const Ideas = (props) => {

    if (!props.ideas || props.ideas.length === 0) {
        return (
            <div className="modern-container">
                <div className="modern-page-header">
                    <h1 className="modern-page-title">
                        <i className="far fa-lightbulb"></i>
                        Ideas
                    </h1>
                </div>
                <div className="empty-state">
                    <i className="far fa-lightbulb"></i>
                    <h3>No ideas yet</h3>
                    <p>Start by creating your first idea!</p>
                    <Link to="/ideas/new" className="modern-btn modern-btn-success" style={{marginTop: '1rem'}}>
                        <i className="fas fa-plus"></i>
                        <span>Create Your First Idea</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="modern-container"> 
            <div className="modern-page-header">
                <h1 className="modern-page-title">
                    <i className="far fa-lightbulb"></i>
                    Ideas
                </h1>
            </div>
            <div className="modern-card-grid"> 
                {props.ideas.map(idea => {
                    // Defensive check: ensure idea has attributes
                    if (!idea || !idea.attributes) {
                        return null;
                    }
                    
                    const componentName = idea.attributes.component_name || 'Uncategorized';
                    const commentCount = idea.relationships && idea.relationships.comments && idea.relationships.comments.data 
                        ? idea.relationships.comments.data.length 
                        : 0;
                    
                    return (
                    <div key={idea.id} className="modern-card">
                        <div className="card-header-modern">
                            <div className="card-icon-wrapper">
                                <i className="far fa-lightbulb"></i>
                            </div>
                            <h3 className="card-title">
                                {idea.attributes.title}
                            </h3>
                            <span className="card-component-badge">
                                <i className="fas fa-tag" style={{marginRight: '0.25rem', fontSize: '0.7rem'}}></i>
                                {componentName}
                            </span>
                        </div>
                        <div className="card-body-modern">
                            {idea.attributes.description}
                        </div>
                        <div className="card-footer-modern">
                            <div className="card-stats">
                                <Likes idea={idea} />
                                <div className="card-stat-item comments-stat">
                                    <i className="fas fa-comments"></i>
                                    <span>{commentCount}</span>
                                </div>
                            </div>
                            <div className="card-actions">
                                <Link to={`/ideas/${idea.id}/edit`} className="btn-modern-sm btn-modern-edit">
                                    <i className="fas fa-edit"></i>
                                    <span>Edit</span>
                                </Link>
                                <Link to={`/ideas/${idea.id}`} className="btn-modern-sm btn-modern-view">
                                    <i className="fas fa-eye"></i>
                                    <span>View</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}

export default withRouter(Ideas)
