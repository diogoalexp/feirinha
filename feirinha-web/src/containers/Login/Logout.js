import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Login.module.css';
// import axios from '../../../axios-orders';
import Input from '../..//components/UI/Input/Input';
import axios from '../..//axios-local';

class Login extends Component {
    state = {
        loading: false
    }



    componentDidMount () {
        this.setState({loading: false});
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState({loading: true});
        window.location.replace("/");
    }

    render () {
        let form = null;
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div>
                {form}                
            </div>
        );
    }
}

export default Login;