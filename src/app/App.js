import React, { Component } from 'react';
import Video from './Video/VideoPage.js'
import './App.css';
import { Header } from './partials/Header'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Video />
      </div>
    );
  }
}

export default App;
