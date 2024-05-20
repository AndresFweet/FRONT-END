import axios from '../axios.js'

export const signinRequest = user => axios.post(`/security/signin`, user)

export const verifyTokenRequest = () => axios.get(`/security/verifyToken`)