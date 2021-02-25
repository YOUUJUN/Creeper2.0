import axios from 'axios'

let $axios = axios.create({
    baseURL : "http://localhost:3010"
});

export default $axios;