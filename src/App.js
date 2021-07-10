import React from 'react'
import IdeasContainer from './containers/IdeasContainer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Router>
          <NavBar />
            <Switch>
              <Route path="/ideas" component={(routerProps) => <IdeasContainer routerProps={routerProps}/>}/>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
      </Router>
    

    </div>
  );
}

export default App;
