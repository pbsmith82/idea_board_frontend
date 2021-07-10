import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchIdeas } from '../actions/fetchIdeas'
import Ideas from '../components/Ideas'
import Idea from '../components/Idea'
import Idea2 from '../components/Idea2'
import NewComment from '../components/NewComment'
import NewIdea from '../components/NewIdea'
import { fetchComponents } from '../actions/fetchComponents'




class IdeasContainer extends React.Component {

    componentDidMount() {
        this.props.fetchIdeas()
        this.props.fetchComponents()
    }

    handelLoading () {
        if(this.props.loading) {
            return <div>Loading...</div>
        } else {
           return( <div>
                <Switch>
                    <Route path='/ideas/:id/comments/new' render={(routerProps) => <NewComment {...routerProps} ideas={this.props.ideas}/>}/>
                    <Route path='/ideas/new' component={NewIdea}/>
                    <Route path='/ideas/:id/edit' render={(routerProps) => <Idea2 {...routerProps} ideas={this.props.ideas}/>}/>
                    <Route path='/ideas/:id' render={(routerProps) => <Idea {...routerProps} ideas={this.props.ideas} />}/>
                    <Route exact path='/ideas' render={(routerProps) => <Ideas {...routerProps} ideas={this.props.ideas}/>}/> 
                </Switch>  
            </div>
            ) }

    }

    render() {
        return (
            <div>
                {this.handelLoading()}
            </div>
        )}
}

const mapStateToProps = state => {
    return {
        ideas: state.ideas,
        loading: state.loading
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchIdeas: () => dispatch({ type:}).fetchIdeas,
//         fetchComponents: actions.fetchComponents
//     }

// }



export default connect(mapStateToProps, {fetchIdeas, fetchComponents})(IdeasContainer)