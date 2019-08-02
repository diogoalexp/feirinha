import React, {Component} from 'react';
import Produto from '../../components/Produto/Produto';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Produtos extends Component {
    state = {
        produtos: [],
        loading: true
    }

    
    componentDidMount() {
        console.log(this.state);
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

    render () {
        return (
            <div>
                {this.state.produtos.map(produto => (
                    <Produto 
                        key={produto.id}
                        nome={produto.nome} 
                        descr={produto.descr}
                        valor={produto.valor}
                        img={produto.img}
                        />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Produtos, axios);