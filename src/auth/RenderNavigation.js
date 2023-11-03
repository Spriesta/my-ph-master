import { Link, Route, Routes } from "react-router-dom";
import { SessionData } from "./AuthWrapper";
import { nav } from "./navigation";

export const RenderRoutes = () => {     // url yönlendirme auth kontrolünü bu fonksiyon yapıyor
     const { user } = SessionData();

     return (
          <Routes> {
               nav.map((r, i) =>  {                                             //navigation.js içerisindeki elemenlerde dönüyor                    
                    if (r.isPrivate && user.isAuthenticated) {                  
                         return <Route key={i} path={r.path} element={r.element}/>
                    } 
                    else if (!r.isPrivate) {                    
                         return <Route key={i} path={r.path} element={r.element}/>
                    } 
                    else 
                         return false
               })
          }             
          </Routes>
     )
}




// export const RenderMenu = () => {            // şuanlık gereksiz menu yetkilendirmesi yapıyor
//      const { user, logout } = AuthData()
   
//      const MenuItem = ({r}) => {
//           return (
//                <div className="menuItem"><Link to={r.path}>{r.name}</Link></div>
//           )
//      }

//      return (
//           <div className="menu">
//                { nav.map((r, i) => {

//                     if (!r.isPrivate && r.isMenu) {
//                          return (
//                               <MenuItem key={i} r={r}/>
//                          )
//                     } else if (user.isAuthenticated && r.isMenu) {
//                          return (
//                               <MenuItem key={i} r={r}/>
//                          )
//                     } else return false
//                } )}

//                { user.isAuthenticated ?
//                <div className="menuItem"><Link to={'#'} onClick={logout}>Log out</Link></div>
//                :
//                <div className="menuItem"><Link to={'login'}>Log in</Link></div> }
//           </div>
//      )
// }