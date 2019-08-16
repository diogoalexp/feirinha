import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Login.module.css';
import Input from '../..//components/UI/Input/Input';
import axios from '../..//axios-local';

class Login extends Component {
    state = {
        orderForm: {
            login: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Login'
                },
                value: 'diogoalexp',
                validation: {
                    required: true
                },
                valid: false,
                touched: true
            },
            senha: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Senha'
                },
                value: '123456',
                validation: {
                    required: true
                },
                valid: false,
                touched: true
            }
        },
        formIsValid: true,
        loading: false,
        auth: null
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log("[inputChangedHandler]:(" + event + "," + inputIdentifier +")")
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
         console.log(event.target);
        
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    componentDidMount () {
        console.log("[componentDidMount]: FormFeira")
    }

    Login = () => {
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        axios.post( '/login', formData )
        .then( response => {
            document.cookie = "token="+response.data;
            if (response.data > 0)
                window.location.replace("/");
            else{
                this.setState( { auth: false, loading: false } );
            }
        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
        
    }

    Cadastrar = () =>{
        alert("cadastrar");
    }

    render () {
        let form = null;
        let msg = null;

        if(this.state.auth === false)
            msg = (
                <p className={classes.Error}>Login e Senha inválidos!</p>
            );

        if(true){
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
                <form onSubmit={this.Login}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            name={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                            />
                    ))}
                    <Button btnType="CadastrarLogin" type="button" clicked={this.Cadastrar} >Ainda não possuo login</Button> 
                    <br />
                    {msg}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Login</Button> 
                </form>
            );
        }
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Entrar no Sistema</h4>
                {form}                
            </div>
        );
    }
}

export default Login;