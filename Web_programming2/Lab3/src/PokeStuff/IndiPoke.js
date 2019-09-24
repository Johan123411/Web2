
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Switch} from 'react-router-dom';
class IndiPoke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: false,
            IndivisualPokemon: undefined,
            Caunt: 0
        };
    }
    async loadPokemon(id) {
        try {
            console.log(typeof id)

            if(id === 'page') {

                console.log("huzzahhhh")
                this.setState({loading: true});
                this.setState({loading:false})

            }
            else
            {
                this.setState({loading: true});
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const IndivisualPokemon = response.data;
                this.setState({loading: false, IndivisualPokemon});

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
             LOADING!!!!
                </article>
            )
        }
        else if(this.state.IndivisualPokemon !== undefined  && this.state.err === false)
        {
            body = (
                <div >
                    <h1 class="header">{this.state.IndivisualPokemon.name}</h1>
                    <br/>
                    <h2 >ID : {this.state.IndivisualPokemon.id}</h2>
                    <br/>
                    <img  src={`${this.state.IndivisualPokemon.sprites.front_default}`}/>
                    <br/>
                    <h2 >Height : {this.state.IndivisualPokemon.height}</h2>
                    <br/>
                    <h2 >Weight : {this.state.IndivisualPokemon.weight}</h2>
                </div>
            )
        }
        else if(this.state.Caunt >= 1 && this.state.err)
        {
            body = (
                <a href="/">ERROR:404 Go BACK!!!!!! </a>
            )  //the issue here is , the first pass takes /page/:pageno as the input parameters and hence the first pass always has an error. to bypass - this block. Because of this.. for single pokemon Error 404 doesn't appear
        }
        return <div className="App-body">{body}</div>
    }
}
export default IndiPoke



