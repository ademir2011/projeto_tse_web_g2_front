
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Header from '../components/Header'
import Loading from '../components/Loagind';
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { RouteComponentProps } from "react-router-dom";
import {login} from '../service/auth.service';
import React, { FormEvent, useState } from "react";
import logoTST from '/images/logo_jt_tst.svg';

import { History } from "history";

import  RouteComponentProps  from 'react-router';
import  withRouter from 'react-router';



// interface RouterProps {
//   history: string;
// }
// type Props = RouteComponentProps<RouterProps>;

export default function Login(){
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLogado, setLogado] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  async function handleLogin(event: FormEvent){

    event.preventDefault()

    setMessage("");
    setLoading(true);

    login(username, password).then(
      (res) => {
        console.log(res.token)
        window.history.pushState("", "" ,"/cadastros");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLogado(true)
        setLoading(false);
        setMessage(resMessage);
      }
    );

    
  };

  return (
        <>


            <Header logado={false} />

          
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto w-auto"
                  src={logoTST}
                  alt="Justiça do trabalho - Tribunal Superior do Trabalho"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Entre agora com sua conta
                </h2>

                {isLogado &&

                 <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">ERROR!</strong>
                  <span className="block sm:inline"> Username e/ou senha incorreta</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setLogado(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div> 
              }
                                
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Username"
                      onChange={event => {setUsername(event.target.value)}}
                    />
                    
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Senha"
                      onChange={event => setPassword(event.target.value)}
                    />
                    
                  </div>
                </div>
    
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Lembrar-me
                    </label>
                  </div>
    
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    {/* ícone de loading */}
                    {loading && (
                        <Loading/>
                    )}
                    Entrar
                  </button>

                  
                </div>
              </form>

              
            </div>
          </div>

          
        </>
      )
}