import axios from "axios";
import { STAGING_BASE_URL, PROD_BASE_URL } from '../config/api.config'

console.log(`Production base url: ${PROD_BASE_URL}\nDevelopment Base URL: ${STAGING_BASE_URL}`)

export const AxiosInstance = axios.create({
   //PRODUCTION
   // baseURL: PROD_BASE_URL

   //TEST
   baseURL: STAGING_BASE_URL
});