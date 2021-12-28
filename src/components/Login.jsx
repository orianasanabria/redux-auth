import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "../redux/userDucks"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((store) => store.user.loading)
  const active = useSelector((store) => store.user.active)
	React.useEffect(() => {
		if(active){
			navigate('/')
		}
	}, [active])
  return (
    <div className="mt-5 text-center">
      <h3>Login with Google</h3>
      <hr />
      <button onClick={() => dispatch(loginAction())} className="btn btn-dark" disabled={loading}>
        Login
      </button>
    </div>
  )
}

export default Login
