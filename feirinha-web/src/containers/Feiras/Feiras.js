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
import search from '../../assets/images/search-icon.png';



class Feiras extends Component {
    state = {
        feiras: [],
        loading: true,
        agora: 0,
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
            historico: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    placeholder: 'Histórico'
                },
                value: false,
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
                    placeholder: 'Minhas Feiras'
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

    handleCheckboxHistoryChange = event => {
        const field = {
            ...this.state.Field
        };
        field.historico.value = event.target.checked;
        this.setState({Field: field});
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

    checkVisibility = (feira) => {
        return (feira.data.getTime() >= this.state.agora || this.state.Field.historico.value) && (this.state.Field.minhas.value ? auth.value() == feira.usuario.id : true ) && (this.state.Field.pesquisa.value == "" || feira.nome.toUpperCase().includes(this.state.Field.pesquisa.value.toUpperCase()));
    }

    render () {
        let criar = null;
        let history = null;
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
            history = <div>
                <Input     
                    legenda={this.state.Field.historico.elementConfig.placeholder}
                    value={this.state.Field.historico.value}
                    elementType={this.state.Field.historico.elementType}
                    elementConfig={this.state.Field.historico.elementConfig}
                    changed={(event) => this.handleCheckboxHistoryChange(event)} 
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
                    <div className={classes.Filter}>{history}</div>
                </div>

                {this.state.feiras.map(feira => (
                    this.checkVisibility(feira) ?
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