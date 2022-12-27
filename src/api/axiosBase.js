
import axios from 'axios'

const token = JSON.parse(localStorage.getItem('coins_user') && localStorage.getItem('coins_user'))?.accessToken



export default axios.create({
   baseURL: process.env.REACT_APP_API_URL,
   headers: {
      Authorization: `Bearer ${token ? token : null}`
   }

});