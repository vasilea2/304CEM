import React, { Component } from 'react';
import './App.css';
import react_logo from './img/logo.svg';
import Header from './components/header/Header'; 

class App extends Component {

  onSearch(term){
    console.log("search on term: " + term)
  }

  render() {

    return (
      <div>
        <Header title='My own title' logo={react_logo} onSearchClick={this.onSearch} backgroundColor='#800000' />
      </div>
    );
  }

}

export default App;
