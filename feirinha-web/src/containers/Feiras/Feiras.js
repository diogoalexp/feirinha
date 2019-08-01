import React, {Component} from 'react';
import Feira from '../../components/Feira/Feira';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Feiras extends Component {
    state = {
        feiras: [],
        loading: true
    }

    
    componentDidMount() {
        console.log(this.state);
        axios.get('/feira')
            .then(res => {
                const fetchedLista = [];
                for (let key in res.data) {
                    fetchedLista.push({
                        ...res.data[key]
                        // ,id: key
                    });
                }
                this.setState({loading: false, feiras: fetchedLista});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                <table>
                    <theader>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                        </tr>
                    </theader>
                    <tbody>
                    {this.state.feiras.map(feira => (
                        <Feira 
                            key={feira.id}
                            nome={feira.nome} 
                            descr={feira.descr}
                            />
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withErrorHandler(Feiras, axios);