import axios from "axios"


export const axiosObj = axios.create({
    baseURL : "http://localhost:5000/api"
})


