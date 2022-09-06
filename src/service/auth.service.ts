import { api } from "./api";
import axios from 'axios'
import { DateTime } from 'luxon';
import authHeader from './auth-header'



interface ProcessoReq {
  numero: string,
  partes: string,
  relator: string,
  resumo: string,
  ordem?: number,
}

interface PautaProps {
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
// Pegar todos os processos
export const getProcessos = () => {
  return api
    .get('/processos')
    .then((response) => {

      return response.data;
    });
};
// Pegar os processos sem vínculo
export const getProcessosSemVinculo = () => {
  return api
    .get('/processosSemVinculo')
    .then((response) => {
      return response.data;
    });
};

export const postProcesso = (processo: ProcessoReq) => {

  const { Authorization } = authHeader();

  return api
    .post('/processo',
      JSON.stringify(processo), {
      headers: {
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

export const deleteProcesso = (id: String) => {

  const { Authorization } = authHeader();

  return api
    .delete(`/processo/${id}`, {
      headers: {
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

// pegar pauta pelo id
export const getPautaId = (id: String) => {

  const { Authorization } = authHeader();


  return api
    .get(`/pauta/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": Authorization
        }
      }
    )
    .then((response) => {
      console.log(response)
      return response.data;
    });
};

export const postPauta = (pauta: PautaProps) => {

  const { Authorization } = authHeader();

  return api
    .post('/pauta',
      JSON.stringify(pauta), {
      headers: {
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

export const postVinculacaoListPauta = (pauta: any, processos: any) => {

  console.log(processos)
  const { Authorization } = authHeader();
  return api
    .post(`/pauta/${pauta.id}/listProcessos`,
      JSON.stringify(processos), {
      headers: {
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

export const desvincularProcesso = (pauta: any, processo: any) => {

  const { Authorization } = authHeader();

  api.delete(`/pauta/${pauta.id}/processo`,
    {
      data: JSON.stringify(processo), headers: {
        "Content-Type": "application/json",
        "Authorization": Authorization
      }
    }).then((response) => {
      console.log(response.data)
      return response.data;
    });
  ;

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