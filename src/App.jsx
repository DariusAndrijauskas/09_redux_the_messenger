import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessengerPage from './pages/MessengerPage';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';
import AllUsersPage from './pages/AllUsersPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/messenger" element={<MessengerPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/user/:username" element={<UserPage/>}/>
          <Route path="/users" element={<AllUsersPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
