import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { getCurrentUser, logout } from './service/auth.service'
import {
    BrowserRouter,
    Routes,
    Route,
    Router,
} from "react-router-dom";
import Login from './pages/Login';
import FormProcesso from './pages/FormProcesso';
import FormJulgamentoPauta from './pages/FormJulgamentoPauta';
import VincularProcessos from './pages/VincularProcessos';

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState<any>(undefined);

    useEffect(() => {
        const user = getCurrentUser()
        if (user) {
            setCurrentUser(user);
        }
        eventBus.on("logout", logOut);
        return () => {
            eventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        logout();
        
      };

    const eventBus = {
        on(event: string, callback: EventListener) {
          document.addEventListener(event, (e) => callback(e));
        },
        dispatch(event: string, data?: any) {
          document.dispatchEvent(new CustomEvent(event, { detail: data }));
        },
        remove(event: string, callback: EventListener) {
          document.removeEventListener(event, callback);
        },
      };


    return (

        <Routes>

            {currentUser && (
                <>
                 <Route path="/cadastros" element={<FormProcesso />} />
                    <Route path="/cadastroJulgamento" element={<FormJulgamentoPauta />} />
                    <Route path="/vincularProcesso" element={<VincularProcessos />} />
                </>
                   
                
            )}

            <Route path="/" element={<App />} />
            <Route index element={<App />} />
            <Route path="/login" element={<Login />} />


        </Routes>
    )
}