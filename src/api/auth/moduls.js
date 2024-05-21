import axios from "../axios.js";

export const getSeccionRequest = () => axios.get(`/security/getSeccions`)

export const getItemsRequest = () => axios.get(`/security/getItems`)
