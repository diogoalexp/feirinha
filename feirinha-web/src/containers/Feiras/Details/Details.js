import React, { Component } from 'react';

import FormFeira from '../FormFeira/FormFeira';


class Details extends Component {
    state = {
        id: 0
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        let id = 0;
        for ( let param of query.entries() ) {
            if (param[0] === 'id') {
                id = param[1];                
            }
        }
        this.setState({id: id});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/feiras/edit' );
    }

    render () {
        return (
            <div>
                {/* <Route 
                    path={this.props.match.path + '/edit'} 
                    render={(props) => (<FormFeira id={this.state.id} {...props} />)} /> */}
                    <FormFeira id={this.state.id} {...this.props} />
            </div>
        );
    }
}

export default Details;