import React from 'react'
//import {connect} from 'react-redux'
import IdeasContainer from './containers/IdeasContainer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <Router>
          <NavBar />
            <Switch>
              <Route path="/ideas" component={(routerProps) => <IdeasContainer routerProps={routerProps}/>}/>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
