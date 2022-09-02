import {api} from "./api";
import axios from 'axios'

const API_URL = "http://localhost:8080/api/";

export const register = (username: string, email: string, password: string) => {
  return api.post('/auth/signup', {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return api
    .post('auth/signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const processos = () => {
    return api 
      .get('processos')
      .then((response) => {
       console.log(response)
        return response.data;
      });
  };

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};