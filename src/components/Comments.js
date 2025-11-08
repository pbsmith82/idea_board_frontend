import React from 'react'
import {Link} from 'react-router-dom'
import '../css/modern.css'

const Comments = (props) => {
    
    let idea = props.idea
    
    return (
        <div className="modern-container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 className="modern-page-title" style={{fontSize: '2rem', margin: 0}}>
                    <i className="fas fa-comments"></i>
                    Comments
                </h2>
                <Link to={`/ideas/${idea.id}/comments/new`} className="modern-btn modern-btn-success">
                    <i className="fas fa-plus"></i>
                    <span>Add Comment</span>
                </Link>
            </div>
            
            {idea.attributes.comments && idea.attributes.comments.length > 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {idea.attributes.comments.map(comment => 
                        <div key={comment.id} className="modern-card">
                            <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                                <div style={{
                                    background: 'var(--accent-gradient)',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <i className="fas fa-comments" style={{color: 'white', fontSize: '1rem'}}></i>
                                </div>
                                <div style={{flex: 1, color: 'var(--text-secondary)', lineHeight: '1.8'}}>
                                    {comment.description}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="empty-state">
                    <i className="fas fa-comments"></i>
                    <h3>No comments yet</h3>
                    <p>Be the first to comment on this idea!</p>
                </div>
            )}
        </div>        
    )
}

export default Comments
