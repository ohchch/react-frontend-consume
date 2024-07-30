
import axios from "axios";

const user_rest_api_url = "http://localhost:8080/api/users";

class UserService {
    getUsers() {
        return axios.get(user_rest_api_url);
    }
    registerUser(user) {
        return axios.post(`${user_rest_api_url}/register`, user);
    }
}

export default new UserService();
