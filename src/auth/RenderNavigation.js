import { Route, Routes, useLocation, Navigate, useNavigate  } from "react-router-dom";
import { nav } from "./navigation";
import axios from 'axios';

export const RenderRoutes = () => { 
     let location = useLocation(); 
     let tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
     let tokenValue;
     let currentPath = location.pathname;     
     let routes = [];
     let urlObj = nav.find(x=> x.path === currentPath);
     const navigate = useNavigate();

     if(tokenCookie !== undefined && tokenCookie !== null && tokenCookie !== ""){      
          tokenValue = tokenCookie.split('=')[1];

          try {
               axios.post('https://localhost:44337/api/Login/tokenValidator?token='+tokenValue, null, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
               })               
               .then((response) => {
                    if(response.data.success){}                                                              
                    else{
                         document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                         navigate('/login');
                    }
                    
               })
               .catch((error) => {
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    navigate('/login');
               });                   
          }
          catch (error) {
               document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
               navigate('/login');
          }      
     }     
     
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