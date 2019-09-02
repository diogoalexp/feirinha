import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './FormProduto.module.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-local';
import auth from '../../../hoc/Auth/Auth';
import validation from '../../../hoc/Utils/Validation';

class FormProduto extends Component {
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
                    maxLength: 50
                },
                valid: false,
                touched: false
            },
            valor: {
                elementType: 'input',
                elementLabel: 'Valor',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Valor'
                },
                value: '',
                validation: {
                    required: false,
                    isCurrency: true
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
                    maxLength: 256
                },
                valid: false,
                touched: false
            },
            categoria: {
                elementType: 'select',
                elementLabel: 'Categoria',
                elementConfig: {
                    options: [
                        {value: 0, displayValue: 'Select'}
                    ]
                },
                value: 0,
                validation: {
                    required: false
                },
                valid: true
            }            
        },
        formIsValid: false,
        loading: false,
        produto: null,
        user: 0,
        id: 0
    }

    saveHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            if(formElementIdentifier == "categoria")
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value != "0" ?  {id: parseInt(this.state.orderForm[formElementIdentifier].value) } : null;
            else
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        formData["id"] = this.state.id;
        formData["usuario"] = auth.user();
        if (this.state.id === 0){
            axios.post( '/produto', formData )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.history.replace( '/produtos') ;
                } )
                .catch( error => {
                    this.setState( { loading: false } );
                } );
        }else{
            axios.put( '/produto', formData )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.history.replace( '/produtos') ;
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

        axios.delete( '/produto',{ data: { id: this.state.id } })
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.replace( '/produtos') ;
            } )
            .catch( error => {
                alert("Esse item está sendo utilizado e não pode ser removido.");
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
        
        if(inputIdentifier == "categoria123"){
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
        if(key == "categoria")
            updatedFormElement.value = value != null ? value.id : "0";
        else
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
            axios.get('/produto/' + id)
                .then(res => {
                    const fetched = res.data;
                    
                    const updatedOrderForm = {
                        ...this.state.orderForm
                    };
                    for (let key in updatedOrderForm) {
                        // if (key != "valor")
                            updatedOrderForm[key] = this.loadField(key, fetched[key]);
                    }
                    const user = fetched["usuario"] != null ? fetched["usuario"] : {};

                    this.setState({loading: false, produto: fetched, orderForm: updatedOrderForm, user: user, id: id});
                })
                .catch(err => {
                    this.setState({loading: false});
                });
        }else if (id === 0){
            let add = {
                id: 0,
            } 
            let user = {id: auth.user().id};
            this.setState({loading: false, produto: add, id: id, user: user });
        }

        axios.get('/categoria/')
        .then(res => {
            const fetched = res.data;
            const updatedOrderForm = {
                ...this.state.orderForm
            };

            let updatedFormElement = { 
                ...this.state.orderForm["categoria"]
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
            
            updatedOrderForm["categoria"] = updatedFormElement;
            this.setState({loading: false, produto: fetched, orderForm: updatedOrderForm });
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }

    render () {
        let form = null;
        let del = null;
        let title = "Visualizar Produto";

        let owner = false;
        if (this.state.user != null && auth.user() != null){
            if (this.state.user.id == auth.user().id ){
                owner = true;
                title = "Gerenciar Produto";
            }
        }

        if(this.state.id > 0 && owner){
            del = (
                <Button btnType="Danger" type="button" clicked={this.deleteHandler} >Delete</Button>
            );
        }

        if(this.state.produto != null){
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

export default FormProduto;