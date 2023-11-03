import { createContext, useContext, useState } from "react"
import { RenderRoutes } from "./RenderNavigation";

const SessionContext = createContext();
export const SessionData = () => useContext(SessionContext);

export const AuthWrapper = () => {
     const [ user, setUser ] = useState({name: "", isAuthenticated: false})

     const login = (userName, password) => {
          //buraya axios isteği ekle          
          return new Promise((resolve, reject) => {
               if (password === "123") {
                    setUser({name: userName, isAuthenticated: true})
                    resolve("success")
               } else {
                    reject("Incorrect password")
               }
          })                 
     }

     return (         
          <SessionContext.Provider value={{user, login}}>
               <>
                    <RenderRoutes />
               </>        
          </SessionContext.Provider>     
     )
}