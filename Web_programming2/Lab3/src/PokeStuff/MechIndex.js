import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MechPaginate from './MechPaginate.js'
import IndiMech from './SingleMech.js'

class MechIndex extends Component{

    render(){
        return (
            <Router>
                <switch>
                    <Route path= {`${this.props.match.path}/:id`} component={IndiMech}/>
                    <Route path= {`${this.props.match.path}/page/:page`} component={MechPaginate}/>

                </switch>
            </Router>
        )

    }
}

export default MechIndex;

