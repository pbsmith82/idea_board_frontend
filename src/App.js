import React from 'react'
import IdeasContainer from './containers/IdeasContainer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
