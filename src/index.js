import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './css/bootstrap.css';
import App from './App';
import ideaReducer from './reducers/ideaReducer.js';
//import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from 'redux-devtools-extension';
import {BrowserRouter as Router} from 'react-router-dom'


const composeEnhancers = composeWithDevTools({
  thunk
});

const store = createStore(ideaReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store} >
    <Router>
    <App />
    </Router>
  </Provider>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



