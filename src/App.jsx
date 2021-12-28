import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { auth } from "./config/firebase.js"
import { onAuthStateChanged } from "firebase/auth"

import Pokemons from "./components/Pokemons.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./components/Login.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchData()
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route element={<PrivateRoute firebaseUser={firebaseUser} />}>
            <Route path="/" element={<Pokemons />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  ) : (
    <div>Loading</div>
  )
}

export default App
