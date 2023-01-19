import axios from 'axios';

// local
import Environment from '../constant/endPoints';

// creating instance
const axiosInstance = axios.create({
  baseURL: Environment.BASE_URL
});

export default axiosInstance;