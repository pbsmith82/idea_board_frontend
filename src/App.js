import React from 'react'
import {connect} from 'react-redux'
import IdeasContainer from './containers/IdeasContainer'


function App() {
  return (
    <div className="App">
        <div class="container">
            <div class="row row-cols-2">
              <IdeasContainer/>
            </div>
        </div>
    </div>
  );
}

export default App;
