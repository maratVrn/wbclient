import axios from "axios"; // Библиотека для запросов на сервер

// API запросов на сервер для авторизации логина и чека пользователя

// На деплое


// На локальном сервере

// export const API_URL='http://localhost:5003/api'
// На ресльном сервере
export const API_URL='https://clientapi.ru.tuna.am/api'


//Для обычных запросов
const $api_client = axios.create({
    withCredentials: true,
    baseURL: API_URL

})

export default $api_client
