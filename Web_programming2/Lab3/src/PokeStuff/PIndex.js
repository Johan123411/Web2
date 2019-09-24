import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PokePaginate from './PokePaginate.js'
import IndiPoke from './IndiPoke.js'

class Pokemon extends Component{

    render(){
        return (
            <Router>
                <switch>

                    <Route path= {`${this.props.match.path}/:id`} component={IndiPoke}/>
                    <Route path= {`${this.props.match.path}/page/:page`} component={PokePaginate}/>

                </switch>
            </Router>
        )

    }
}

export default Pokemon;

