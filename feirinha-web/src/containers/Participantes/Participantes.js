import React, {Component} from 'react';
import Participante from '../../components/Participante/Participante';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Participantes extends Component {
    state = {
        participantes: [],
        loading: true
    }

    
    componentDidMount() {
        console.log(this.state);
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

    render () {
        return (
            <div>
                {this.state.participantes.map(participante => (
                    <Participante 
                        key={participante.id}
                        nome={participante.nome} 
                        descr={participante.descr}
                        endereco={participante.endereco}
                        img={participante.img}
                        />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Participantes, axios);