import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { nav } from "./navigation";

export const RenderRoutes = () => { 
     let location = useLocation(); 
     let tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
     let currentPath = location.pathname;     
     let routes = [];
     let urlObj = nav.find(x=> x.path === currentPath);

     if(urlObj !== undefined && urlObj !== null){
          
          if(tokenCookie !== undefined && tokenCookie !== null && tokenCookie !== ""){
               routes = nav.map((r, i) => (
                    <Route key={i} path={r.path} element={r.element} />
               ));
          }
          else if(!urlObj.isPrivate){// sadece login ve register
               routes = nav.filter(item => item.path === "/login" || item.path === "/register" || item.path === "/").map((r, i) => (
                    <Route key={i} path={r.path} element={r.element} />
               ));
          }
          else if(urlObj.isPrivate){
               return <Navigate to="/login" />;
          }
     }
     else{
            alert("Hata URL 404..!")// buraya hata ekranı yerleştir
            ///return <Navigate to="/login" />;
     }

     return (
          <Routes>      
          {
               routes.map((r, i) =>  {
                    return <Route key={i} path={r.props.path} element={r.props.element}/>
              })
          }                 
          </Routes>
     )
}