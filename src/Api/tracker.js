import axios from 'axios';


export const trackerApi= axios.create({
   
  baseURL:'http://52.139.224.15:9191/account'
})


