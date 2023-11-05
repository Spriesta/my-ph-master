import { createContext, useContext, useState } from "react"
import { RenderRoutes } from "./RenderNavigation";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SessionContext = createContext();
export const SessionData = () => useContext(SessionContext);

export const AuthWrapper = () => {
     const navigate = useNavigate();
  
     const login = async (userName, password) => {

          return new Promise((resolve, reject) => {
               let requestData = {
                    "userInput": userName,
                    "password": password
               }

               try {
                    axios.post('https://localhost:44337/api/Login/login', requestData, {
                         headers: {
                         'Content-Type': 'application/json',
                         },
                    })               
                    .then((response) => {
                         if(response.data.success)
                         {
                              let expirationDate = new Date();
                              expirationDate.setTime(expirationDate.getTime() + (15 * 60 * 1000)); // 15 dakika
                              document.cookie = `token=${response.data.token.accessToken}; expires=${expirationDate.toUTCString()}`;
                              resolve(true);
                         }
                    })
                    .catch((error) => {
                         reject('Axios isteği sırasında bir hata oluştu.');
                    });                   
               }
               catch (error) {
                    reject('Incorrect password');
               }  
          });            
     }

     const logout = async () => {
          let tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));

          if (tokenCookie) {          
               tokenCookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
          } 
          else {
               const cookies = document.cookie.split('; ');
               for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
               }
               console.log('Tüm çerezler silindi.');
          }

          navigate("/login");
     }

     return (         
          <SessionContext.Provider value={{login, logout}}>
               <>
                    <RenderRoutes />
               </>        
          </SessionContext.Provider>     
     )
}
