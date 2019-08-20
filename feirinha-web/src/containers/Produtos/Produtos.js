import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Produto from '../../components/Produto/Produto';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/UI/Button/Button';
import auth from '../../hoc/Auth/Auth';
import classes from './Produtos.module.css';
import FormProduto from './FormProduto/FormProduto';



class Produtos extends Component {
    state = {
        produtos: [],
        loading: true
    }

    
    componentDidMount() {
        axios.get('/produto')
            .then(res => {
                const fetchedLista = [];
                for (let key in res.data) {
                    fetchedLista.push({
                        ...res.data[key]
                        // ,id: key
                    });
                }
                this.setState({loading: false, produtos: fetchedLista});
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
            pathname: '/produto/edit',
            search: '?' + queryString
        });
    }

    addHandler = () => {
        this.props.history.push({
            pathname: '/produto/add'
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
                {this.state.produtos.map(produto => (
                    <Produto 
                        key={produto.id}
                        nome={produto.nome} 
                        descr={produto.descr}
                        valor={produto.valor}
                        img={produto.img}   
                        owner={produto.usuario}     
                        edit={() => this.checkoutContinuedHandler(produto.id)}               
                        />
                        
                ))}
                <Route 
                    path={this.props.match.path + '/edit'} 
                    render={(props) => (<FormProduto id={this.state.selectedId} {...props} />)} />
                <Route 
                    path={this.props.match.path + '/add'} 
                    render={(props) => (<FormProduto id={this.state.selectedId} {...props} />)} />
            </div>
        );
    }
}

export default withErrorHandler(Produtos, axios);