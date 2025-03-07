import axios from "axios"; // Библиотека для запросов на сервер

// API запросов на сервер для авторизации логина и чека пользователя

// На деплое

// export const API_URL='http://194.67.111.13:5000/api'не используем
// export const API_URL='https://server.bm-algoritmik.ru/api'

// На локальном сервере
// export const API_URL='http://localhost:5000/api'
export const API_URL='http://localhost:5003/api'

//Для обычных запросов
const $api_client = axios.create({
    withCredentials: true,
    baseURL: API_URL

})

export default $api_client
