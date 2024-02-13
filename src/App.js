import logo from './logo.svg'
import './App.css'
// src/App.tsx
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import useAuth from './hooks/useAuth'
import { app, auth } from './api'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  const { isAuth, logout } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && isAuth) {
        console.log('logout..')
        logout()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/profile" /> : <Login />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      <ToastContainer />
    </Router>
  )
}

export default App
