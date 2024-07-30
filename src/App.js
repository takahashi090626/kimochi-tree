import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import EmotionInput from './components/EmotionInput';
import Profile from './components/Profile';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/input" element={<EmotionInput />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;