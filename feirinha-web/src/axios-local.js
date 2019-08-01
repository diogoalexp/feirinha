import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://react-my-burger-diogoalexp.firebaseio.com/'
    baseURL: 'http://localhost:8080/api/'
});

export default instance;