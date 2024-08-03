
import axios from "axios";
const apiConfig = axios.create({
    baseURL : "http://localhost:8000/api",
    withCredentials : true
});
export default apiConfig;