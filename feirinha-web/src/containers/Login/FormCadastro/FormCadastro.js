import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './FormCadastro.module.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-local';
import auth from '../../../hoc/Auth/Auth';
import validation from '../../../hoc/Utils/Validation';

class FormCadastro extends Component {
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
                    required: true,
                    maxLength: 100
                },
                valid: false,
                touched: false
            },
            cpf: {
                elementType: 'input',
                elementLabel: 'CPF',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CPF'
                },
                value: '',
                validation: {
                    required: true,
                    isCPF: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementLabel: 'Email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    maxLength: 100
                },
                valid: false,
                touched: false
            },
            login: {
                elementType: 'input',
                elementLabel: 'Login',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Login'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 12
                },
                valid: false,
                touched: false
            },
            senha: {
                elementType: 'input',
                elementLabel: 'Senha',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Senha'
                },
                value: '',
                validation: {
                    required: true,
                    isPass: true,
                    maxLength: 16
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
                    required: true,
                    maxLength: 100
                },
                valid: false,
                touched: false
            },
            nascimento: {
                elementType: 'date',
                elementLabel: 'Nascimento',
                elementConfig: {
                    type: 'date',
                    placeholder: 'dd/mm/aaaa'
                },
                value: '',
                validation: {
                    required: true,
                    isDate: true
                },
                valid: false,
                touched: false
            }          
        },
        formIsValid: false,
        loading: false,
        id: null
    }

    saveHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        formData["id"] = this.state.id;
        if (this.state.id === 0){
            axios.post( '/usuario', formData )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.history.replace( '/home') ;
                } )
                .catch( error => {
                    this.setState( { loading: false } );
                } );
        }else{
            axios.put( '/usuario', formData )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.history.replace( '/home') ;
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

        axios.delete( '/usuario',{ data: { id: this.state.id } })
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.replace( '/home') ;
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
        

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = validation.check(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
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
        let id = 0;
        console.log(auth.status());
        console.log(auth.value());
        console.log(auth.user());
        if (auth.status()){
            id = auth.user().id
        }
        console.log("id:"+id);
        if(id > 0){
            axios.get('/usuario/' + id)
                .then(res => {
                    const fetched = res.data;
                    
                    const updatedOrderForm = {
                        ...this.state.orderForm
                    };
                    for (let key in updatedOrderForm) {
                        updatedOrderForm[key] = this.loadField(key, fetched[key]);
                    }

                    this.setState({loading: false, usuario: fetched, orderForm: updatedOrderForm, id: id});
                })
                .catch(err => {
                    this.setState({loading: false});
                });
        }else if (id === 0){
            this.setState({loading: false, id: id });
        }
    }

    render () {
        let form = null;
        let del = null;
        let title = "Gerenciar Cadastro";

        let owner = true;
        if (this.state.user != null && auth.user() != null){
            if (this.state.user.id == auth.user().id ){
                owner = true;
                title = "Gerenciar Cadastro";
            }
        }

        if(this.state.id > 0 && owner){
            del = (
                <Button btnType="Danger" type="button" clicked={this.deleteHandler} >Delete</Button>
            );
        }

        if(this.state.id != null){
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
                            upload={(event) => this.imageHandler(event, formElement.id )}
                            readOnly={!owner}
                        />
                    ))}
                    <Button btnType="Voltar" type="button" clicked={this.checkoutCancelledHandler} >Voltar</Button>
                    {/* {del} */}
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

export default FormCadastro;