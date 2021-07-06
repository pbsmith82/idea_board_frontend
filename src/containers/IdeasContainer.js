import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchIdeas } from '../actions/fetchIdeas'
import Ideas from '../components/Ideas'
import Idea from '../components/Idea'
import NewIdea from '../components/NewIdea'
import NavBar from '../components/NavBar'

class IdeasContainer extends React.Component {

    componentDidMount() {
        this.props.fetchIdeas()
    }

    // handleLoading = () => {
    //     console.log(this.props.loading)
    //     if(this.props.loading) {
    //       return <div>Loading...</div>
    //     } else {
    //         debugger
    //       return <Ideas ideas={this.props.ideas} />
    //     }
    //   }

    render() {
        return (
            <div>
            <div>
                <NavBar />
                <Switch>
                    <Route path='/ideas/new' component={NewIdea}/>
                    <Route path='/ideas/:id' render={(routerProps) => <Idea {...routerProps} ideas={this.props.ideas}/>}/>
                    <Route path='/ideas' render={(routerProps) => <Ideas {...routerProps} ideas={this.props.ideas}/>}/>  
                </Switch>
                
            </div>
            {/* <div className="App">
            <h1>Ideas</h1>
            {this.handleLoading()}
          </div> */}
          </div>
        )}
}

const mapStateToProps = state => {
    return {
        ideas: state.ideas,
        loading: state.loading
    }
}

export default connect(mapStateToProps, {fetchIdeas})(IdeasContainer)