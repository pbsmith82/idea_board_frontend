import '../css/modern.css'
import {Link} from 'react-router-dom'

const Home = (props) => {

    return (
        <div className="modern-home"> 
            <div className="hero-background"></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="modern-home-title">
                    <i className="far fa-lightbulb"></i>
                    Idea Board
                </h1>
                <p className="modern-home-subtitle">
                    Capture, organize, and share your brilliant ideas. 
                    Transform thoughts into actionable innovations that drive success.
                </p>
                <div className="hero-cta">
                    <Link to="/ideas" className="modern-btn modern-btn-primary" style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        padding: '1rem 2rem'
                    }}>
                        <i className="fas fa-rocket"></i>
                        <span>Get Started</span>
                    </Link>
                    <Link to="/ideas/new" className="modern-btn" style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        padding: '1rem 2rem'
                    }}>
                        <i className="fas fa-plus"></i>
                        <span>Create Idea</span>
                    </Link>
                </div>
                
                <div className="hero-features">
                    <div className="hero-feature">
                        <i className="fas fa-lightbulb"></i>
                        <h3>Capture Ideas</h3>
                        <p>Quickly jot down your thoughts and inspirations</p>
                    </div>
                    <div className="hero-feature">
                        <i className="fas fa-layer-group"></i>
                        <h3>Organize</h3>
                        <p>Categorize and structure your ideas by component</p>
                    </div>
                    <div className="hero-feature">
                        <i className="fas fa-users"></i>
                        <h3>Collaborate</h3>
                        <p>Share ideas and get feedback from your team</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
