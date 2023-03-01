import axios from "axios";
const token = localStorage.getItem("access_token") == "undefined"? '' : JSON.parse(localStorage.getItem("access_token"));
const customAxios = axios.create({

    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default customAxios;