import axios from 'axios';
import * as urls from '../config/url';

export class UserService {
  constructor(userClient, sessionStorage) {
    this.userClient = userClient;
    this.sessionStorage = sessionStorage;
  }

  login(loginData) {
    const responseToken = this.userClient.login(loginData);
    this.sessionStorage.put("token", responseToken);
  }
}

export class UserClient {
  async login(loginData) {
    try {
      const response = await axios
        .post(`${urls.PROTOCOL}://${urls.BASE_URL}/${urls.USERS_PATH}/login`, {
          ...loginData
        });

      return response.data.token
    } catch (error) {
      throw new BadCredentialException(error)
    }
  }
}

export class SessionStorage {
  put(key, value) {
    localStorage.setItem(key, value.toString());
  }

  get(key) {
    return localStorage.getItem(key);
  }
}

export class BadCredentialException extends Error { }