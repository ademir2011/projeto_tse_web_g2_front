import {api} from "./api";
import axios from 'axios'
import { DateTime } from 'luxon';
import authHeader from './auth-header'



interface ProcessoReq{
  numero: string,
  partes: string,
  relator: string,
  resumo: string,
  ordem?: number,
}

interface PautaProps{
  orgaoJudicante: string,
  sistemaPauta: string,
  meioJulgamento: string,
  dataSessao: Date,
  dataDivulgacao: Date,
  dataPublicacao: Date,
  dataCriacao?: string,
  processos?: any
}


const API_URL = import.meta.env.VITE_API_URL

export const register = (username: string, email: string, password: string) => {
  return api.post('/auth/signup', {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return api
    .post('/auth/signin', {
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


// Rotas de Processos

export const getProcessos = () => {
    return api 
      .get('/processos')
      .then((response) => {
       
        return response.data;
      });
};


export const postProcesso = (processo:ProcessoReq) => {

  const {Authorization} = authHeader();
  
  return api 
    .post('/processo', 
      JSON.stringify(processo),{
        headers:{
          "Content-Type": "application/json",
          "Authorization": Authorization
        }
      }
        
      )
    .then((response) => {
      console.log(response.data)
      return response.data;
    });
};

// Métodos para pauta

export const getPautas = () => {
  return api 
    .get('/pautas')
    .then((response) => {
      console.log(response)
      return response.data;
    });
};


export const postPauta = (pauta:PautaProps) => {

  const {Authorization} = authHeader();
  
  return api 
    .post('/pauta', 
      JSON.stringify(pauta),{
        headers:{
          "Content-Type": "application/json",
          "Authorization": Authorization
        }
      }
        
      )
    .then((response) => {
      console.log(response.data)
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

export const getUserToken = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr).token;
  
  return null;
};