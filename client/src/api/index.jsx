import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.REACT_APP_API_URL || 'http://localhost:80'
console.log(url)
const instance = axios.create({
  baseURL: url
})
instance.defaults.headers.common['Authorizaion'] = ''

export default instance
