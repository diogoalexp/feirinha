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



class Feiras extends Component {
    state = {
        feiras: [],
        loading: true
    }

    
    componentDidMount() {
        axios.get('/feira')
            .then(res => {
                const fetchedLista = [];
                for (let key in res.data) {
                    fetchedLista.push({
                        ...res.data[key]
                        // ,id: key
                    });
                }
                this.setState({loading: false, feiras: fetchedLista});
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



    render () {
        let criar = null;

        if (auth.user() != null){
            criar = <div className={classes.Cadastrar}>
                        <Button btnType="Criar" clicked={() => this.addHandler(0)}>Criar</Button> 
                    </div>
        }

        return (
            <div>
                {criar}
                <br />
                {this.state.feiras.map(feira => (
                    <Feira 
                        key={feira.id}
                        nome={feira.nome} 
                        descr={feira.descr}
                        data={feira.data}
                        img={feira.img}   
                        owner={feira.usuario}     
                        edit={() => this.checkoutContinuedHandler(feira.id)}               
                        />
                        
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