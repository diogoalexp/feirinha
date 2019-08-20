import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './FormFeira.module.css';
// import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-local';
import auth from '../../../hoc/Auth/Auth';
import validation from '../../../hoc/Utils/Validation';

class FormFeira extends Component {
    state = {
        orderForm: {
            img: {
                elementType: 'img',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Descrição'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            nome: {
                elementType: 'input',
                elementLabel: 'Nome',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nome'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            local: {
                elementType: 'input',
                elementLabel: 'Local',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Local'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            endereco: {
                elementType: 'input',
                elementLabel: 'Endereço',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Endereço'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            descr: {
                elementType: 'textarea',
                elementLabel: 'Descrição',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Descrição'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            data: {
                elementType: 'date',
                elementLabel: 'Data',
                elementConfig: {
                    type: 'date',
                    placeholder: 'dd/mm/aaaa'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            recorrente: {
                elementType: 'select',
                elementLabel: 'Recorrente',
                elementConfig: {
                    options: [
                        {value: true, displayValue: 'Sim'},
                        {value: false, displayValue: 'Não'}
                    ]
                },
                value: false,
                validation: {},
                valid: true
            },
            participantes: {
                elementType: 'select-multiple',
                elementLabel: 'Participantes',
                elementConfig: {
                    options: [
                        {value: 0, displayValue: 'Select'}
                    ]
                },
                value: [],
                validation: {
                    required: false
                },
                valid: true
            }            
        },
        formIsValid: false,
        loading: false,
        feira: null,
        user: 0,
        id: 0
    }

    saveHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        formData["id"] = this.state.id;
        formData["usuario"] = auth.user();
        if (this.state.id === 0){
            axios.post( '/feira', formData )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.history.replace( '/feiras') ;
                } )
                .catch( error => {
                    this.setState( { loading: false } );
                } );
        }else{
            axios.put( '/feira', formData )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.history.replace( '/feiras') ;
                } )
                .catch( error => {
                    this.setState( { loading: false } );
                } );
        }
    }

    deleteHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData["id"] = this.state.id;

        axios.delete( '/feira',{ data: { id: this.state.id } })
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.replace( '/feiras') ;
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }



    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        
        if(inputIdentifier == "participantes"){
            let notExists = updatedFormElement.value.find(x => x.id == event.target.value) == undefined && event.target.value != 0;
            if (notExists) {
                let append = updatedFormElement.elementConfig.options.find(x => x.value == event.target.value);;
                updatedFormElement.value.push({
                    id: event.target.value,
                    nome: append.displayValue
                });
            }
        }else{
            updatedFormElement.value = event.target.value;
        }
        updatedFormElement.valid = validation.check(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    unselectHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };

        let element = updatedFormElement.value.find(x => x.id == value);
        let index = updatedFormElement.value.indexOf(element);
        if (index > -1) {
            updatedFormElement.value.splice(index, 1);
        }
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
      
    imageHandler = (value, inputIdentifier) =>{
        let arquivo = value.split(',')[1];
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = arquivo;
        updatedFormElement.valid = validation.check(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    loadField = (key, value) =>{
        let updatedFormElement = { 
            ...this.state.orderForm[key]
        }; 
        updatedFormElement.value = value;
        updatedFormElement.valid = validation.check(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        return updatedFormElement
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    componentDidMount () {
        const query = new URLSearchParams( this.props.location.search );
        let id = 0;
        for ( let param of query.entries() ) {
            if (param[0] === 'id') {
                id = param[1];                
            }
        }
        if(id > 0){
            axios.get('/feira/' + id)
                .then(res => {
                    const fetched = res.data;
                    
                    const updatedOrderForm = {
                        ...this.state.orderForm
                    };
                    for (let key in updatedOrderForm) {
                        updatedOrderForm[key] = this.loadField(key, fetched[key]);
                    }
                    const user = fetched["usuario"] != null ? fetched["usuario"] : {};

                    this.setState({loading: false, feira: fetched, orderForm: updatedOrderForm, user: user, id: id});
                })
                .catch(err => {
                    this.setState({loading: false});
                });
        }else if (id === 0){
            let add = {
                id: 0,
            } 
            let user = {id: auth.user().id};
            this.setState({loading: false, feira: add, id: id, user: user });
        }

        axios.get('/participante/')
        .then(res => {
            const fetched = res.data;
            const updatedOrderForm = {
                ...this.state.orderForm
            };

            let updatedFormElement = { 
                ...this.state.orderForm["participantes"]
            }; 
            
            const formElementsArray = [{
                value: 0,
                displayValue: "Select"
            }];
            for (let item in fetched) {
                formElementsArray.push({
                    value: fetched[item].id,
                    displayValue: fetched[item].nome
                });
            }

            updatedFormElement.elementConfig.options = formElementsArray;
            updatedFormElement.touched = false;
            
            updatedOrderForm["participantes"] = updatedFormElement;
            this.setState({loading: false, feira: fetched, orderForm: updatedOrderForm });
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }

    render () {
        let form = null;
        let del = null;
        let title = "Visualizar Feira";

        let owner = false;
        if (this.state.user != null && auth.user() != null){
            if (this.state.user.id == auth.user().id ){
                owner = true;
                title = "Gerenciar Feira";
            }
        }

        if(this.state.id > 0 && owner){
            del = (
                <Button btnType="Danger" type="button" clicked={this.deleteHandler} >Delete</Button>
            );
        }

        if(this.state.feira != null){
            const formElementsArray = [];
            const orderForm = {
                ...this.state.orderForm
            };
            for (let key in orderForm) {

                formElementsArray.push({
                    id: key,
                    config: orderForm[key]
                });
            }
            form = (
                <form onSubmit={this.saveHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            label={formElement.config.elementLabel}
                            key={formElement.id}
                            name={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                            unselect={this.unselectHandler} 
                            upload={(event) => this.imageHandler(event, formElement.id )}
                            readOnly={!owner}
                        />
                    ))}
                    <Button btnType="Voltar" type="button" clicked={this.checkoutCancelledHandler} >Voltar</Button>
                    {del}
                    {owner ?  <Button btnType="Success" disabled={!this.state.formIsValid}>Save</Button> : null}
                </form>
            );
        }
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>{title}</h4>
                {form}
            </div>
        );
    }
}

export default FormFeira;