import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-xod.firebaseio.com/'
});

export default instance;