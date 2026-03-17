import axios from 'axios'
export const apiClient=axios.create({
    // Will change it later to real backend URL
    // Maybe using with env file
    baseURL:process.env.EXPO_PUBLIC_NGROK??'http://192.168.18.13:3000',
    withCredentials:true,
    headers:{
        "ngrok-skip-browser-warning": "true"
    }
})