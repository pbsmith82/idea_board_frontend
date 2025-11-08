import React from 'react'
import IdeasContainer from './containers/IdeasContainer'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import NewComponent from './components/NewComponent';
import EditComponent from './components/EditComponent';
import Components from './components/Components';
import MindMap from './components/MindMap';
import './css/modern.css';

function App() {
  return (
    <div className="App">
      <Router>
          <NavBar />
            <Switch>
              <Route path="/components/new" component={NewComponent}/>
              <Route path="/components/:id/edit" component={EditComponent}/>
              <Route path="/components" component={Components}/>
              <Route path="/mindmap" component={MindMap}/>
              <Route path="/ideas" component={(routerProps) => <IdeasContainer routerProps={routerProps}/>}/>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
