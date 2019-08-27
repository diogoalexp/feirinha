import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Feira from '../../components/Feira/Feira';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Details from '../../containers/Feiras/Details/Details';
import Button from '../../components/UI/Button/Button';
import auth from '../../hoc/Auth/Auth';
import classes from './Feiras.module.css';
import FormFeira from './FormFeira/FormFeira';
import Convert from '../../hoc/Utils/Convert';
import Input from '../../components/UI/Input/Input';



class Feiras extends Component {
    state = {
        feiras: [],
        historico: false,
        loading: true,
        agora: 0
    }

    
    componentDidMount() {
        axios.get('/feira')
            .then(res => {
                const fetchedLista = [];
                let agora = Date.now();
                for (let key in res.data) {
                    let fetched = res.data[key];
                    let x = new Date(fetched.data);
                    let tempData = new Date(x.getFullYear(),x.getMonth(), x.getUTCDate());

                    if(fetched.recorrente && agora > tempData.getTime() ){
                        fetched.data = Convert.nextDay(tempData);
                    }else{
                        fetched.data = tempData;
                    }

                    fetchedLista.push({
                        ...fetched
                        // ,id: key
                    });
                }
                fetchedLista.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(a.data) - new Date(b.data);
                  });

                this.setState({loading: false, feiras: fetchedLista, agora: agora});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = (id) => {
        const queryParams = [];
        queryParams.push('id=' + id);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/feira/edit',
            search: '?' + queryString
        });
    }

    addHandler = () => {
        this.props.history.push({
            pathname: '/feira/add'
        });
    }

    handleCheckboxChange = event => {
        console.log("CHECK");
        this.setState({ historico: event.target.checked });
    }

    render () {
        let criar = null;
        let history = null;
        const Checkbox = props => (
            <input type="checkbox" {...props} />
          )
        if (auth.user() != null){
            criar = <div className={classes.Cadastrar}>
                        <Button btnType="Criar" clicked={() => this.addHandler(0)}>Criar</Button> 
                    </div>
            history = <div>
                    <Checkbox             
                        checked={this.state.historico}
                        onChange={this.handleCheckboxChange}>
                    </Checkbox>
                    <span>Histórico</span>
                </div>
        }

        return (
            <div>
                {criar}
                {history}
                <br />
                <br />
                {this.state.feiras.map(feira => (
                    (feira.data.getTime() >= this.state.agora  ||  this.state.historico) ?
                    <Feira 
                        key={feira.id}
                        nome={feira.nome} 
                        descr={feira.descr}
                        data={feira.data}
                        img={feira.img}   
                        owner={feira.usuario}     
                        recorrente={feira.recorrente}     
                        edit={() => this.checkoutContinuedHandler(feira.id)}               
                        />
                        : null
                        
                ))}
                <Route 
                    path={this.props.match.path + '/edit'} 
                    render={(props) => (<FormFeira id={this.state.selectedId} {...props} />)} />
                <Route 
                    path={this.props.match.path + '/add'} 
                    render={(props) => (<FormFeira id={this.state.selectedId} {...props} />)} />
            </div>
        );
    }
}

export default withErrorHandler(Feiras, axios);