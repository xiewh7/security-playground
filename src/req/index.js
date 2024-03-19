import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    withCredentials: true
})



export default request