import React, { Component } from 'react'
import Header from './comp/Header/Header.js'
import Main from './Main'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <Main />
      </div>
    );
  }
}

export default App
