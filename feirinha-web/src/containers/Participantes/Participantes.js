import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Participante from '../../components/Participante/Participante';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/UI/Button/Button';
import auth from '../../hoc/Auth/Auth';
import classes from './Participantes.module.css';
import FormParticipante from './FormParticipante/FormParticipante';



class Participantes extends Component {
    state = {
        participantes: [],
        loading: true
    }

    
    componentDidMount() {
        axios.get('/participante')
            .then(res => {
                const fetchedLista = [];
                for (let key in res.data) {
                    fetchedLista.push({
                        ...res.data[key]
                        // ,id: key
                    });
                }
                this.setState({loading: false, participantes: fetchedLista});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = (id) => {
        console.log("AQUI");
        const queryParams = [];
        queryParams.push('id=' + id);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/participante/edit',
            search: '?' + queryString
        });
    }

    addHandler = () => {
        this.props.history.push({
            pathname: '/participante/add'
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
                <br />
                {this.state.participantes.map(participante => (
                    <Participante 
                        key={participante.id}
                        nome={participante.nome} 
                        descr={participante.descr}
                        endereco={participante.endereco}
                        img={participante.img}   
                        owner={participante.usuario}     
                        edit={() => this.checkoutContinuedHandler(participante.id)}               
                        />
                        
                ))}
                <Route 
                    path={this.props.match.path + '/edit'} 
                    render={(props) => (<FormParticipante id={this.state.selectedId} {...props} />)} />
                <Route 
                    path={this.props.match.path + '/add'} 
                    render={(props) => (<FormParticipante id={this.state.selectedId} {...props} />)} />
            </div>
        );
    }
}

export default withErrorHandler(Participantes, axios);