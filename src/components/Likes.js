import React from 'react'
import {connect} from 'react-redux'
import '../css/modern.css'
import { sendLike } from '../actions/sendLike'
import { sendDislike } from '../actions/sendDislike'


class Likes extends React.Component {

    handleLikeClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const currentLikes = this.props.idea.attributes.likes || 0
        const ideaData = {
            id: this.props.idea.id,
            likes: currentLikes + 1
        }
        
        this.props.sendLike(ideaData).catch(error => {
            console.error('Failed to update like:', error)
        })
    }

    handleDislikeClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const currentDislikes = this.props.idea.attributes.dislikes || 0
        const ideaData = {
            id: this.props.idea.id,
            dislikes: currentDislikes + 1
        }
        
        this.props.sendDislike(ideaData).catch(error => {
            console.error('Failed to update dislike:', error)
        })
    }

    render() {
        const likes = this.props.idea.attributes.likes || 0
        const dislikes = this.props.idea.attributes.dislikes || 0
        
        return(
            <>
                <div className="card-stat-item likes-stat">
                    <button 
                        onClick={this.handleLikeClick}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#4facfe',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        type="button"
                        title="Like this idea"
                    > 
                        <i className="fas fa-thumbs-up"></i>
                        <span>{likes}</span>
                    </button>
                </div>
                <div className="card-stat-item dislikes-stat">
                    <button 
                        onClick={this.handleDislikeClick}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#f44336',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        type="button"
                        title="Dislike this idea"
                    > 
                        <i className="fas fa-thumbs-down"></i>
                        <span>{dislikes}</span>
                    </button>
                </div>
            </>
        )
    }

}

export default connect(null, {sendLike, sendDislike})(Likes)
