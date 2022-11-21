import {Navigate, useLocation} from "react-router-dom"

export default function PrivateRoute({children}) {
  const isLogged = localStorage.getItem('isLogged')
  const location = useLocation()
  

  if(isLogged === "false" || null) {
    return <Navigate to="/login" replace={true} state={{
      return_url: location.pathname
    }} />
  }

  return children
}