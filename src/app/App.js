import React, { Component } from 'react';
import FeedPage from './Feed/FeedPage';
import './App.css';
import { Header } from './partials/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FeedPage />
      </div>
    );
  }
}

export default App;
