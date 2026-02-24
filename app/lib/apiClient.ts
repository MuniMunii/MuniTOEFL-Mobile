import axios from 'axios'
export const apiClient=axios.create({
    // Will change it later to real backend URL
    // Maybe using with env file
    baseURL:process.env.NODE_ENV==='development'?'http://localhost:3000':'',
    withCredentials:true
})