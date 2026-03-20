
import axios from "axios";


const chatApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default chatApi;
