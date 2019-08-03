import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './FormFeira.module.css';
// import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-local';

class FormFeira extends Component {
    state = {
        orderForm: {
            nome: {
                elementType: 'input',
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
                elementType: 'input',
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
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'dd/mm/aaaa'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            // recorrente: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'email',
            //         placeholder: 'Recorrente'
            //     },
            //     value: '',
            //     validation: {
            //         required: true,
            //         isEmail: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            recorrente: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: true, displayValue: 'Sim'},
                        {value: false, displayValue: 'Não'}
                    ]
                },
                value: false,
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
        feira: null
    }

    saveHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        formData["id"] = this.props.id;
        if (this.props.id == 0){
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
        formData["id"] = this.props.id;

        axios.delete( '/feira',{ data: { id: this.props.id } })
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.replace( '/feiras') ;
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
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

    inputChangedHandler = (event, inputIdentifier, load = null) => {
        console.log("[inputChangedHandler]:(" + event + "," + inputIdentifier + "," + load +")")
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = load != null ? load : event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        return updatedFormElement
    }

    componentDidMount () {
        console.log("[componentDidMount]: FormFeira")
        if(this.props.id > 0){
            axios.get('/feira/' + this.props.id)
                .then(res => {
                    const fetched = res.data;
                    
                    const updatedOrderForm = {
                        ...this.state.orderForm
                    };
                    for (let key in updatedOrderForm) {
                        updatedOrderForm[key] = this.loadField(key, fetched[key]);
                    }

                    this.setState({loading: false, feira: fetched, orderForm: updatedOrderForm });
                })
                .catch(err => {
                    this.setState({loading: false});
                });
        }else if (this.props.id == 0){
            let add = {
                id: 0
            } 
            this.setState({loading: false, feira: add });
        }
    }

    render () {
        console.log("[render]: FormFeira")
        let form = null;
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
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Save</Button> 
                    <Button btnType="Danger" type="button" clicked={this.deleteHandler} >Delete</Button>
                </form>
            );
        }
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Gerenciar Feira</h4>
                {form}
                
            </div>
        );
    }
}

export default FormFeira;