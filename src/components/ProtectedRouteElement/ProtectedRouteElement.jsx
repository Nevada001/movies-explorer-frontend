import { useNavigate } from "react-router"

export default function ProtectedRouteElement({isLogin, element: Component, ...props}) {
  const navigate = useNavigate()
  return (
    isLogin ? <Component {...props} /> : navigate('/')
  )

}