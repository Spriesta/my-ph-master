import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { nav } from "./navigation";
//import { useNavigate } from "react-router-dom";

export const RenderRoutes = () => {     // url yönlendirme auth kontrolünü bu fonksiyon yapıyor
     //let navigate = useNavigate();
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
          else if(!urlObj.isPrivate){         // sadece login ve register'a istek attı ise comp dön
               routes = nav.filter(item => item.path === "/login" || item.path === "/register" || item.path === "/").map((r, i) => (
                    <Route key={i} path={r.path} element={r.element} />
               ));
          }
          else if(urlObj.isPrivate){
               return <Navigate to="/login" />;
          }
     }
     else{
            alert("Hata URL 404..!")   // buraya hata ekranı yerleştir
            //navigate("/hatalı ekran");
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


/*
nav.map((r, i) =>  {                                             //navigation.js içerisindeki elemenlerde dönüyor                    
                    if (r.isPrivate && r.path === currentPath && (tokenCookie !== undefined && tokenCookie !== null && tokenCookie !== "")) {                  
                         return <Route key={i} path={r.path} element={r.element}/>
                    } 
                    else if (!r.isPrivate && r.path === currentPath) {                    //login ve register
                         return <Route key={i} path={r.path} element={r.element}/>
                    } 
                    else {
                         //navigate("/login");
                         return false;
                    }                      
               })
*/