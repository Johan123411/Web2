import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BerryPaginate from './BerryPaginate.js'
import IndiBerry from './SingleBerry.js'

class BerryIndex extends Component{

    render(){
        return (
            <Router>
                <switch>
                    <Route path= {`${this.props.match.path}/:id`} component={IndiBerry}/>
                    <Route path= {`${this.props.match.path}/page/:page`} component={BerryPaginate}/>
                </switch>
            </Router>
        )

    }
}

export default BerryIndex;

