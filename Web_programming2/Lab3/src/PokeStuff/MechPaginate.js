
import React, { Component } from 'react';
import axios from 'axios';

class PokePaginate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokeList: {},
            err: false
        };
    }

    async loadPokemon(page) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/machine/?offset=${page * 20}`);
            const pokeList = response.data;
            this.setState({pokeList});
        } catch (e) {
            this.setState({err: true});
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.loadPokemon(this.props.match.params.page);
    }

    async componentWillReceiveProps(nextProperties){
        const nextPG = nextProperties.match.params.page;
        const prevPG = this.props.match.params.page;
        if(nextPG !== prevPG){
            await this.loadPokemon(nextPG)
        }
    }

    render()
    {
        if (this.state.pokeList !== undefined && this.props.match.params.page >= 0 && this.props.match.params.page <73)
        {
            let Back = '';
            let Next = '';

            if (this.state.pokeList.next) {

                Next = <a class="btn btn-primary" href={`/machines/page/${parseInt(this.props.match.params.page, 10) + 1}`} role="button">Next</a>
            }
            if (this.state.pokeList.previous) {
                Back = <a class="btn btn-primary" href={`/machines/page/${parseInt(this.props.match.params.page, 10) - 1}` } role="button" >Back</a>
            }

            let a = this.state.pokeList.results;
            let a1 = a;

            var resList = [];
            for (var x in a1) {

                let mechID = a1[x].url.match(/([^/]*)\/*$/)[1];
                console.log(mechID);
                resList.push(mechID)
            }
            let body = null;

            body = (
                <div>
                    <ul>
                        {resList.map((value, index) => {
                            return (<a key={index} href={`/machines/${value}`}>
                                <h2>Machine Number : {value}</h2>
                            </a>)
                        })}
                    </ul>
                    <article>
                        {Back}
                        <h3> Page Number {this.props.match.params.page} </h3>
                        {Next}
                    </article>
                </div>

            );

            return (<div className="App-body"> {body} </div>)
        }
        else
        {
            return(<a href="/">ERROR:404 Go BACK!!!!!! </a>)
        }
    }
}

export default PokePaginate
