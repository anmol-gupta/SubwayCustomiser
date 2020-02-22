import axios from 'axios'

const instance = axios.create({
    baseURL: "https://subway-customiser.firebaseio.com/"
});

export default instance;