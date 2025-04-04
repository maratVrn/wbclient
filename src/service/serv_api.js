import axios from "axios"; // Библиотека для запросов на сервер

// export const API_URL='http://localhost:5003/api'
export const API_URL_SERV2='http://localhost:5002/api'
const $api_serv_update = axios.create({
    withCredentials: true,
    baseURL: API_URL_SERV2

})



export default $api_serv_update
