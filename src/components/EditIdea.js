import React from 'react'
import {connect} from 'react-redux'
import {updateIdea} from '../actions/updateIdea'
import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'


class EditIdea extends React.Component {
    
    
    
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
            <div className="container" align="center"><br/>
                <h1 className="display-5"><i className="far fa-lightbulb" style={{color: '#ffc107'}}></i>&nbsp;&nbsp;Edit Idea</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Idea Title:</span>
                        <input type='text' className="form-control" value={this.state.title} name="title" aria-label="title" aria-describedby="basic-addon1" onChange={this.handleChange}/> 
                    </div>
                    <label hidden={true}>Idea Component: </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2">Component:</span>
                        <input type='text' className="form-control" value={this.state.component_id} name="component_id" aria-label="component" aria-describedby="basic-addon2" onChange={this.handleChange}/> 
                    </div>
                    <label hidden={true}>Idea Description: </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">Description:</span>
                        <textarea className="form-control" value={this.state.description} name="description" aria-label="description" aria-describedby="basic-addon3" onChange={this.handleChange}/>
                    </div>
                    <div className="row2 row-cols-22">
                        <div></div>
                        <div align="center">
                            <input type="Submit" className="btn btn-primary btn-sm"/>
                            &nbsp;&nbsp;
                            <Link to={`/ideas/${this.props.idea.id}`}>
                            <input type="button" value="Cancel" className="btn btn-danger shadow-sm btn-sm"/>
                            </Link>
                        
                        </div>
                    </div>              
                </form>
          </div>
        )
    } 
}


export default compose(withRouter, connect(null, {updateIdea}))(EditIdea) 