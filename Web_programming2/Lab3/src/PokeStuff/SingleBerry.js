
import React, { Component } from 'react';
import axios from 'axios';


class SingleBerry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: false,
            IndivisualPokemon: undefined,
            Caunt: 0,
            Dsprites: undefined
        };
    }
    async loadPokemon(id) {
        try {
            if(id === 'page') {

                console.log("huzzahhhh")
                this.setState({loading: true});
                this.setState({loading:false})

            }
            else {
                this.setState({loading: true});
                const response = await axios.get(`https://pokeapi.co/api/v2/berry/${id}`);
                const IndivisualPokemon = response.data;
                const sprites = IndivisualPokemon.item.url;

                let mechID = sprites.match(/([^/]*)\/*$/)[1];


                const response2 = await axios.get(`https://pokeapi.co/api/v2/item/${mechID}`);

                this.setState({loading: false, IndivisualPokemon, Dsprites: response2});

                console.log(this.state.Dsprites)
            }
        } catch (e) {
            this.setState({ loading: false });
            if(this.state.err === true)
            {
                let a = parseInt(this.state.Caunt) + 1;
                this.setState({Caunt: parseInt(a)}) ;
            }
            this.setState({err: true});
            let a = parseInt(this.state.Caunt) + 1;
            this.setState({Caunt: parseInt(a)});
            console.log(e);
            console.log(this.state.Caunt)
        }
    }
    async componentDidMount() {

        await this.loadPokemon(this.props.match.params.id);
    }
    async componentWillReceiveProps(nextProperties){
        const nextPG = nextProperties.match.params.id;
        const prevPG = this.props.match.params.id;
        if(nextPG !== prevPG){
            await this.loadPokemon(nextPG)
        }
    }
    render()
    {
        let body = null;
        console.log(this.state.Caunt);
        if(this.state.loading){
            body = (
                <article>
                    LOADING!!!
                </article>
            )
        }
        else if(this.state.IndivisualPokemon !== undefined  && this.state.err === false)
        {
            body = (
                <div >
                    <h1 class="header">{this.state.IndivisualPokemon.item.name}</h1>
                    <br/>
                    <h2 >ID : {this.state.IndivisualPokemon.id}</h2>
                    <br/>

                    <img  src={`${this.state.Dsprites.data.sprites.default}`}/>
                    <br/>

                    <h2 >Growth Time : {this.state.IndivisualPokemon.growth_time}</h2>

                    <br/>
                    <h2 >Maximum Harvest : {this.state.IndivisualPokemon.max_harvest}</h2>

                </div>
            )
        }
        else if(this.state.Caunt >= 1 && this.state.err)
        {
            body = (
                <a href="/">ERROR:404 Go BACK!!!!!! </a>
            )
        }
        return <div className="App-body">{body}</div>
    }
}
export default SingleBerry



