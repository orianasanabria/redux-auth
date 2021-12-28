import React from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signOutAction } from "../redux/userDucks"

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const active = useSelector((store) => store.user.active)
  console.log(active)
  const signOut = () => {
    dispatch(signOutAction())
    navigate("/login")
  }
  return (
    <div className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        PokeDex
      </Link>

      <div className="d-flex">
        {active ? (
          <>
            <NavLink className="btn btn-dark mr-2" to="/">
              Home
            </NavLink>
            <button onClick={() => signOut()} className="btn btn-dark mr-2">
              Signout
            </button>
          </>
        ) : (
          <NavLink className="btn btn-dark mr-2" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Navbar
