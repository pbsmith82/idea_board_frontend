import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchIdeas} from '../actions/fetchIdeas'
import {fetchComponents} from '../actions/fetchComponents'
import '../css/modern.css'

class MindMap extends React.Component {
    constructor(props) {
        super(props)
        this.svgRef = React.createRef()
        this.hasDraggedRef = { current: false }
        this.nodeClickStart = { x: 0, y: 0 }
        this.state = {
            zoom: 1,
            panX: 0,
            panY: 0,
            isDragging: false,
            dragStart: { x: 0, y: 0 },
            selectedNode: null,
            hasDragged: false,
            dragStartPos: { x: 0, y: 0 }
        }
    }

    componentDidMount() {
        if (!this.props.ideas || this.props.ideas.length === 0) {
            this.props.fetchIdeas()
        }
        if (!this.props.components || this.props.components.length === 0) {
            this.props.fetchComponents()
        }
    }

    handleWheel = (e) => {
        e.preventDefault()
        const delta = e.deltaY * -0.001
        const newZoom = Math.min(Math.max(0.5, this.state.zoom + delta), 3)
        this.setState({ zoom: newZoom })
    }

    handleMouseDown = (e) => {
        // Only handle panning if clicking on the background, not on nodes
        const targetTag = e.target.tagName.toLowerCase()
        if (e.button === 0) {
            if (targetTag === 'div' || targetTag === 'svg' || targetTag === 'line' || targetTag === 'defs' || targetTag === 'g' || targetTag === 'marker' || targetTag === 'polygon') {
                // Background click - enable panning
                this.hasDraggedRef.current = false
                this.setState({
                    isDragging: true,
                    hasDragged: false,
                    dragStart: { x: e.clientX - this.state.panX, y: e.clientY - this.state.panY },
                    dragStartPos: { x: e.clientX, y: e.clientY }
                })
            } else if (targetTag === 'circle') {
                // Node click - track position but don't enable panning
                this.nodeClickStart = { x: e.clientX, y: e.clientY }
                this.hasDraggedRef.current = false
                e.stopPropagation()
            }
        }
    }

    handleMouseMove = (e) => {
        if (this.state.isDragging) {
            const deltaX = Math.abs(e.clientX - this.state.dragStartPos.x)
            const deltaY = Math.abs(e.clientY - this.state.dragStartPos.y)
            
            // Consider it a drag if moved more than 5 pixels
            if (deltaX > 5 || deltaY > 5) {
                this.hasDraggedRef.current = true
                this.setState({
                    hasDragged: true,
                    panX: e.clientX - this.state.dragStart.x,
                    panY: e.clientY - this.state.dragStart.y
                })
            }
        }
        
        // Always check if we're moving while clicking on a node
        if (this.nodeClickStart.x !== 0 || this.nodeClickStart.y !== 0) {
            const deltaX = Math.abs(e.clientX - this.nodeClickStart.x)
            const deltaY = Math.abs(e.clientY - this.nodeClickStart.y)
            if (deltaX > 5 || deltaY > 5) {
                this.hasDraggedRef.current = true
            }
        }
    }

    handleMouseUp = () => {
        this.setState({ 
            isDragging: false,
            hasDragged: false
        })
        // Reset node click tracking after a short delay to allow onClick to fire
        setTimeout(() => {
            this.nodeClickStart = { x: 0, y: 0 }
        }, 100)
    }


    resetView = () => {
        this.setState({ zoom: 1, panX: 0, panY: 0 })
    }

    render() {
        const { ideas, components } = this.props
        const { zoom, panX, panY, selectedNode } = this.state

        if (!ideas || !components) {
            return (
                <div className="modern-container">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading mind map...</p>
                    </div>
                </div>
            )
        }

        if (components.length === 0) {
            return (
                <div className="modern-container">
                    <div className="modern-page-header">
                        <h1 className="modern-page-title">
                            <i className="fas fa-project-diagram"></i>
                            Mind Map
                        </h1>
                    </div>
                    <div className="empty-state">
                        <i className="fas fa-project-diagram"></i>
                        <h3>No components yet</h3>
                        <p>Create components and ideas to see them in the mind map!</p>
                        <Link to="/components/new" className="modern-btn modern-btn-success" style={{marginTop: '1rem'}}>
                            <i className="fas fa-plus"></i>
                            <span>Create Component</span>
                        </Link>
                    </div>
                </div>
            )
        }

        // Group ideas by component
        const ideasByComponent = {}
        ideas.forEach(idea => {
            if (idea && idea.attributes) {
                // Try to get component ID from relationships first, then attributes
                let componentId = null
                if (idea.relationships && idea.relationships.component && idea.relationships.component.data) {
                    componentId = String(idea.relationships.component.data.id)
                } else if (idea.attributes.component_id) {
                    componentId = String(idea.attributes.component_id)
                }
                
                if (componentId) {
                    if (!ideasByComponent[componentId]) {
                        ideasByComponent[componentId] = []
                    }
                    ideasByComponent[componentId].push(idea)
                }
            }
        })

        // Calculate positions for components in a circle
        const componentCount = components.length
        
        // Calculate layout - adjust based on number of components
        // Use larger canvas coordinates for better zoom/pan experience
        const centerX = 700
        const centerY = 500
        const componentRadius = 70
        const ideaRadius = 45
        const componentSpacing = componentCount > 0 ? Math.max(250, 300 - componentCount * 10) : 250
        let componentPositions = []
        
        if (componentCount === 0) {
            // No components - show message
        } else if (componentCount === 1) {
            // Single component in center
            componentPositions = [{ component: components[0], x: centerX, y: centerY, angle: 0 }]
        } else {
            // Multiple components arranged in a circle
            componentPositions = components.map((component, index) => {
                const angle = (2 * Math.PI * index) / componentCount - Math.PI / 2
                const x = centerX + Math.cos(angle) * componentSpacing
                const y = centerY + Math.sin(angle) * componentSpacing
                return { component, x, y, angle }
            })
        }

        // Calculate positions for ideas around their components
        const ideaPositions = []
        componentPositions.forEach(({ component, x, y, angle }) => {
            const componentId = String(component.id)
            const componentIdeas = ideasByComponent[componentId] || []
            const ideaCount = componentIdeas.length
            
            if (ideaCount === 0) return
            
            // Arrange ideas in a semi-circle around the component
            const angleSpread = Math.min(ideaCount * 0.2, Math.PI * 1.2) // Max 216 degrees
            const startAngle = angle - angleSpread / 2
            
            componentIdeas.forEach((idea, ideaIndex) => {
                const ideaAngle = startAngle + (ideaIndex / (ideaCount - 1 || 1)) * angleSpread
                const distance = componentRadius + ideaRadius + 40
                const ideaX = x + Math.cos(ideaAngle) * distance
                const ideaY = y + Math.sin(ideaAngle) * distance
                ideaPositions.push({ idea, x: ideaX, y: ideaY, componentX: x, componentY: y })
            })
        })

        return (
            <div className="modern-container">
                <div className="modern-page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem'}}>
                    <h1 className="modern-page-title" style={{margin: 0}}>
                        <i className="fas fa-project-diagram"></i>
                        Mind Map
                    </h1>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button onClick={this.resetView} className="modern-btn modern-btn-secondary">
                            <i className="fas fa-home"></i>
                            <span>Reset View</span>
                        </button>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.9)', padding: '0.5rem 1rem', borderRadius: '12px'}}>
                            <i className="fas fa-search-plus" style={{color: '#667eea'}}></i>
                            <span style={{fontSize: '0.9rem', fontWeight: 600}}>Zoom: {Math.round(zoom * 100)}%</span>
                        </div>
                    </div>
                </div>

                <div 
                    style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-lg)',
                        overflow: 'hidden',
                        position: 'relative',
                        height: '600px',
                        cursor: this.state.isDragging ? 'grabbing' : 'default'
                    }}
                    onWheel={this.handleWheel}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: this.state.isDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={this.handleMouseDown}
                        onMouseMove={this.handleMouseMove}
                        onMouseUp={this.handleMouseUp}
                        onMouseLeave={this.handleMouseUp}
                    >
                        <svg
                            ref={this.svgRef}
                            width="1400"
                            height="1000"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`,
                                transformOrigin: 'center center',
                                transition: this.state.isDragging ? 'none' : 'transform 0.1s'
                            }}
                        >
                        {/* Draw connections from components to ideas */}
                        {ideaPositions.map(({ idea, x, y, componentX, componentY }, index) => (
                            <line
                                key={`connection-${idea.id}-${index}`}
                                x1={componentX}
                                y1={componentY}
                                x2={x}
                                y2={y}
                                stroke="rgba(102, 126, 234, 0.3)"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                                style={{ pointerEvents: 'none' }}
                            />
                        ))}

                        {/* Arrow marker definition */}
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="10"
                                refX="9"
                                refY="3"
                                orient="auto"
                            >
                                <polygon
                                    points="0 0, 10 3, 0 6"
                                    fill="rgba(102, 126, 234, 0.5)"
                                />
                            </marker>
                        </defs>

                        {/* Draw component nodes */}
                        {componentPositions.map(({ component, x, y }) => {
                            const componentId = String(component.id)
                            const ideaCount = (ideasByComponent[componentId] || []).length
                            return (
                                <g key={`component-${component.id}`} style={{ pointerEvents: 'none' }}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={componentRadius}
                                        fill="url(#componentGradient)"
                                        stroke={selectedNode === `component-${component.id}` ? '#667eea' : 'rgba(102, 126, 234, 0.5)'}
                                        strokeWidth={selectedNode === `component-${component.id}` ? '4' : '3'}
                                        style={{ cursor: 'pointer', pointerEvents: 'all' }}
                                        onMouseDown={(e) => {
                                            this.nodeClickStart = { x: e.clientX, y: e.clientY }
                                            this.hasDraggedRef.current = false
                                            e.stopPropagation()
                                        }}
                                        onMouseUp={(e) => {
                                            if (!this.hasDraggedRef.current) {
                                                const moved = Math.abs(e.clientX - this.nodeClickStart.x) > 5 || Math.abs(e.clientY - this.nodeClickStart.y) > 5
                                                if (!moved) {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    this.props.history.push(`/components/${component.id}/edit`)
                                                }
                                            }
                                        }}
                                        onMouseEnter={() => this.setState({ selectedNode: `component-${component.id}` })}
                                        onMouseLeave={() => this.setState({ selectedNode: null })}
                                    />
                                    <text
                                        x={x}
                                        y={y - componentRadius - 12}
                                        textAnchor="middle"
                                        fill="var(--text-primary)"
                                        fontSize="13"
                                        fontWeight="700"
                                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                                    >
                                        {component.attributes.name}
                                    </text>
                                    <text
                                        x={x}
                                        y={y + 3}
                                        textAnchor="middle"
                                        fill="rgba(255, 255, 255, 0.9)"
                                        fontSize="11"
                                        fontWeight="600"
                                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                                    >
                                        <tspan x={x} dy="0">{ideaCount} {ideaCount === 1 ? 'Idea' : 'Ideas'}</tspan>
                                    </text>
                                </g>
                            )
                        })}

                        {/* Draw idea nodes */}
                        {ideaPositions.map(({ idea, x, y }) => (
                            <g key={`idea-${idea.id}`} style={{ pointerEvents: 'none' }}>
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={ideaRadius}
                                    fill="url(#ideaGradient)"
                                    stroke={selectedNode === `idea-${idea.id}` ? '#4facfe' : 'rgba(79, 172, 254, 0.3)'}
                                    strokeWidth={selectedNode === `idea-${idea.id}` ? '4' : '2'}
                                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                                    onMouseDown={(e) => {
                                        this.nodeClickStart = { x: e.clientX, y: e.clientY }
                                        this.hasDraggedRef.current = false
                                        e.stopPropagation()
                                    }}
                                    onMouseUp={(e) => {
                                        if (!this.hasDraggedRef.current) {
                                            const moved = Math.abs(e.clientX - this.nodeClickStart.x) > 5 || Math.abs(e.clientY - this.nodeClickStart.y) > 5
                                            if (!moved) {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                this.props.history.push(`/ideas/${idea.id}`)
                                            }
                                        }
                                    }}
                                    onMouseEnter={() => this.setState({ selectedNode: `idea-${idea.id}` })}
                                    onMouseLeave={() => this.setState({ selectedNode: null })}
                                />
                                <text
                                    x={x}
                                    y={y - ideaRadius - 8}
                                    textAnchor="middle"
                                    fill="var(--text-primary)"
                                    fontSize="11"
                                    fontWeight="600"
                                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                                >
                                    {idea.attributes.title.length > 15 
                                        ? idea.attributes.title.substring(0, 15) + '...' 
                                        : idea.attributes.title}
                                </text>
                                <text
                                    x={x}
                                    y={y + 4}
                                    textAnchor="middle"
                                    fill="rgba(255, 255, 255, 0.9)"
                                    fontSize="10"
                                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                                >
                                    <tspan x={x} dy="0">👍 {idea.attributes.likes || 0}</tspan>
                                </text>
                            </g>
                        ))}

                        {/* Gradient definitions */}
                        <defs>
                            <linearGradient id="componentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                            </linearGradient>
                            <linearGradient id="ideaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4facfe" />
                                <stop offset="100%" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                        </svg>
                    </div>

                    {/* Instructions overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '1rem',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-md)',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        zIndex: 10,
                        maxWidth: '250px'
                    }}>
                        <div style={{marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-primary)'}}>
                            <i className="fas fa-info-circle" style={{marginRight: '0.5rem'}}></i>
                            Instructions
                        </div>
                        <div>• Scroll to zoom in/out</div>
                        <div>• Click and drag background to pan</div>
                        <div>• Click nodes to view details</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ideas: state.ideas || [],
        components: state.components || []
    }
}

export default connect(mapStateToProps, {fetchIdeas, fetchComponents})(withRouter(MindMap))

