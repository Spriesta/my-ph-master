import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Private } from "../pages/Private"

export const nav = [
     { path: "/", name: "login", element: <Login />, isPrivate: false  },
     { path: "/login", name: "login", element: <Login />, isPrivate: false  },
     { path: "/private", name: "private", element: <Private />, isPrivate: true  },
]