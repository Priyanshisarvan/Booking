import axios from 'axios'
import config from '../Config/config';
export default axios.create({
    baseURL: config.BaseUrl+'adminAddRoom',   

});
