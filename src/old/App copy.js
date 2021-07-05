import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIdeas } from './actions/ideaActions'
import IdeaList from './components/IdeaList'



class App extends Component {   
  
  componentDidMount() {
    this.props.fetchIdeas()
  }
  
  handleLoading = () => {
    console.log(this.props.loading)
    if(this.props.loading) {
      return <div>Loading...</div>
    } else {
      return <IdeaList ideaTitles={this.props.ideaTitles} />
    }
  }

  render() {
    return (
      <div>
      <div className="App">
        <h1>Ideas</h1>
        {this.handleLoading()}
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.ideas)
  return {
    ideaTitles: state.ideas,
    loading: state.loading
  }
}

export default connect(mapStateToProps, { fetchIdeas })(App)
