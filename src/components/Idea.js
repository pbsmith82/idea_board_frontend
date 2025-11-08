import React from 'react'
import {Link} from 'react-router-dom'
import '../css/modern.css'
import Comments from './Comments'
import Likes from './Likes'

const Idea = (props) => {
    if(props.ideas.length < 1) {
        return (
            <div className="modern-container">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    } else {
        let idea = props.ideas.find( ({id}) => id === `${parseInt(props.match.params.id)}`)
        
        if (!idea || !idea.attributes) {
            return (
                <div className="modern-container">
                    <div className="empty-state">
                        <i className="fas fa-exclamation-triangle"></i>
                        <h3>Idea not found</h3>
                        <Link to="/ideas" className="modern-btn modern-btn-secondary" style={{marginTop: '1rem'}}>
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Ideas</span>
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
                        {idea.attributes.title}
                    </h1>
                </div>
                
                <div className="modern-form" style={{marginBottom: '2rem'}}>
                    <div className="form-group-modern">
                        <label className="form-label-modern">
                            <i className="fas fa-puzzle-piece" style={{marginRight: '0.5rem'}}></i>
                            Component
                        </label>
                        <input 
                            type='text' 
                            className="form-input-modern" 
                            value={idea.attributes.component_name || 'N/A'} 
                            disabled 
                            readOnly 
                        />                     
                    </div>
                    <div className="form-group-modern">
                        <label className="form-label-modern">
                            <i className="fas fa-align-left" style={{marginRight: '0.5rem'}}></i>
                            Description
                        </label>
                        <textarea 
                            className="form-textarea-modern" 
                            value={idea.attributes.description} 
                            disabled 
                            readOnly
                        />
                    </div>
                    <div className="card-footer-modern" style={{borderTop: 'none', paddingTop: '0'}}>
                        <div className="card-stats">
                            <Likes idea={idea} />
                            <div>
                                <i className="fas fa-comments"></i>
                                {idea.relationships && idea.relationships.comments && idea.relationships.comments.data ? idea.relationships.comments.data.length : 0} comments
                            </div>
                        </div>
                        <div className="card-actions">
                            <Link to={`/ideas/${idea.id}/edit`} className="btn-modern-sm btn-modern-edit">
                                <i className="fas fa-edit"></i>
                                <span>Edit</span>
                            </Link>
                            <Link to={`/ideas`} className="btn-modern-sm modern-btn-secondary">
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <Comments idea={idea}/>
            </div>        
        )
    }
}

export default Idea
