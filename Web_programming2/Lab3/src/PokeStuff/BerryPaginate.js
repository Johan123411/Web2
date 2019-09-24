
import React, { Component } from 'react';
import axios from 'axios';

class BerryPaginate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokeList: {},
            err: false
        };
    }

    async loadPokemon(page) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/berry/?offset=${page * 20}`);
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
        if (this.state.pokeList !== undefined && this.props.match.params.page >= 0 && this.props.match.params.page <4)
        {
            let Back = '';
            let Next = '';

            if (this.state.pokeList.next) {

                Next = <a class="btn btn-primary" href={`/berries/page/${parseInt(this.props.match.params.page, 10) + 1}`} role="button">Next</a>
            }
            if (this.state.pokeList.previous) {
                Back = <a class="btn btn-primary" href={`/berries/page/${parseInt(this.props.match.params.page, 10) - 1}` } role="button" >Back</a>
            }

            let a = this.state.pokeList.results;
            let a1 = a;
            var resList = [];
            for (var x in a1) {
                resList.push(this.state.pokeList.results[x].name)
            }
            let body = null;

            body = (
                <div>
                    <ul>
                        {resList.map((value, index) => {
                            return (
                                <a key={index} href={`/berries/${value}`}>
                                    <h3>{value}</h3>
                                    <br/>
                                </a>
                            )
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

export default BerryPaginate
