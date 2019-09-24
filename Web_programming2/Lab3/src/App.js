import React, { Component } from 'react';
import logo from './img/original.gif';
import './App.css';
import Pokemon from "./PokeStuff/PIndex.js"
import Machines from "./PokeStuff/MechIndex.js"
import Berries from "./PokeStuff/BerryIndex.js"

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
   render() {
      return (
         <Router>

            <div className="App">

               <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">PokeAPI</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                          aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                     <div className="navbar-nav">
                        <a className="nav-item nav-link" href="/pokemon/page/0">Pokemon</a>
                        <a className="nav-item nav-link" href="/berries/page/0">Berries</a>
                        <a className="nav-item nav-link" href="/machines/page/0">Machines</a>
                        <a className="nav-item nav-link" href="/">Home</a>
                     </div>
                  </div>
               </nav>
               <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to the Poke API</h1>
                  <p> A repository for Pokemons, Berries and Machines</p>
               </header>
               <br />
               <br/>
               <div className="App-body">
                  <Switch>
                  <Route path="/pokemon" component={Pokemon} />
                  <Route path="/machines" component={Machines} />
                  <Route path="/berries" component={Berries} />
                  </Switch>
                  </div>
            </div>
         </Router>
      );
   }
}


export default App;
