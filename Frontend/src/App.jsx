import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import assets from './assets/assets'
import {AuthContext} from './context/authContext.jsx'
import {Toaster} from 'react-hot-toast';

const App = () => {
  const { authUser } = React.useContext(AuthContext);
  const isAuthenticated = !!authUser;
  console.log("Auth User in App.jsx:", authUser);
  


  return (
    <div className="bg-contain" style={{ backgroundImage: `url(${assets.bgImage})` }}>
      <Toaster/>
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> :  <LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
