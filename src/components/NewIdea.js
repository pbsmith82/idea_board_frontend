import React from 'react'
import {connect} from 'react-redux'
import {sendIdea} from '../actions/sendIdea'
import '../css/bootstrap.css'
import '../css/bootstrap-grid.css'
import { withRouter } from 'react-router-dom'
import {compose} from "redux"
import {Link} from 'react-router-dom'

class NewIdea extends React.Component {

    state = {

        title: '',
        component_id: '',
        description: '',
        likes: 1

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendIdea(this.state)
        this.setState({
            title: '',
            component_id: '',
            description: '',
            likes: 1
        })
        this.props.history.push('/ideas')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(

            <div className="container" align="center"><br/>
                <h1 className="display-5"><i className="far fa-lightbulb" style={{color: '#ffc107'}}></i>&nbsp;&nbsp;Add Your Idea</h1>
                <form onSubmit={this.handleSubmit}>
                    <label hidden={true}>Idea Title: </label><br/>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Idea Title:</span>
                        <input type='text' className="form-control" value={this.state.title} name="title" aria-label="title" aria-describedby="basic-addon1" onChange={this.handleChange}/> 
                    </div>
                    <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="basic-addon2">Component:</label>
                        <select className="form-select" value={this.state.component_id} id="basic-addon2" name="component_id" aria-label="component" aria-describedby="basic-addon2" onChange={this.handleChange}>
                            <option defaultValue>Choose...</option>
                            <option value="1">Chat</option>
                            <option value="2">Notifications</option>
                        </select> 
                    </div>
                    <label hidden={true}>Idea Description: </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">Description:</span>
                        <textarea className="form-control" value={this.state.description} name="description" aria-label="description" aria-describedby="basic-addon3" onChange={this.handleChange}/>
                    </div>
                    <div className="row2 row-cols-22">
                        <div></div>
                        <div align="center">
                            <input type="Submit" className="btn btn-primary btn-sm" />
                            &nbsp;&nbsp;
                            <Link to={`/ideas`}>
                            <input type="button" value="Cancel" className="btn btn-danger shadow-sm btn-sm"/>
                            </Link>
                        </div>
                    </div>                
                </form>
            </div>

        )
    }

}

export default compose(withRouter, connect(null, {sendIdea}))(NewIdea)