import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Participante from '../../components/Participante/Participante';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/UI/Button/Button';
import auth from '../../hoc/Auth/Auth';
import classes from './Participantes.module.css';
import FormParticipante from './FormParticipante/FormParticipante';
import Input from '../../components/UI/Input/Input';
import search from '../../assets/images/search-icon.png';



class Participantes extends Component {
    state = {
        participantes: [],
        loading: true,
        Field: {
            pesquisa: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pesquisar'
                },
                value: "",
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            minhas: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    placeholder: 'Meus Participantes'
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            }
        }
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

    handleCheckboxMinhasChange = event => {
        const field = {
            ...this.state.Field
        };
        field.minhas.value = event.target.checked;
        this.setState({Field: field});
    }

    inputChangedHandler = (event) => {
        const field = {
            ...this.state.Field
        };
        field.pesquisa.value = event.target.value;
        this.setState({Field: field});
    }

    checkVisibility = (participante) => {
        return (this.state.Field.minhas.value ? auth.value() == participante.usuario.id : true ) && (this.state.Field.pesquisa.value == "" || participante.nome.includes(this.state.Field.pesquisa.value));
    }

    render () {
        let criar = null;
        let minhas = null;
        if (auth.user() != null){
            criar = <div className={classes.Cadastrar}>
                        <Button btnType="Criar" clicked={() => this.addHandler(0)}>Criar</Button> 
                    </div>
            minhas = <div>
                <Input     
                    legenda={this.state.Field.minhas.elementConfig.placeholder}
                    value={this.state.Field.minhas.value}
                    elementType={this.state.Field.minhas.elementType}
                    elementConfig={this.state.Field.minhas.elementConfig}
                    changed={(event) => this.handleCheckboxMinhasChange(event)} 
                ></Input>
            </div>
        }
        let pesquisa = <div>
                <Input     
                    value={this.state.Field.pesquisa.value}
                    elementType={this.state.Field.pesquisa.elementType}
                    elementConfig={this.state.Field.pesquisa.elementConfig}
                    changed={(event) => this.inputChangedHandler(event)} 
                ></Input>
                <div className={classes.Search}>
                        <img src={search} alt="Sem Foto" />
                </div>
            </div>

        return (
            <div>
                <div className={classes.FilterBlock}>
                    {criar}
                    <div className={classes.FilterProcurar}>{pesquisa}</div>
                    <div className={classes.Filter}>{minhas}</div>
                </div>
                {this.state.participantes.map(participante => (
                    this.checkVisibility(participante) ?
                    <Participante 
                        key={participante.id}
                        nome={participante.nome} 
                        descr={participante.descr}
                        endereco={participante.endereco}
                        img={participante.img}   
                        owner={participante.usuario}     
                        edit={() => this.checkoutContinuedHandler(participante.id)}               
                        />
                        : null
                        
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