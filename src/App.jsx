import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProfileProvider } from './context/ProfileContext';
import Navbar from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ProfileProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />

                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
                  <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
              </main>

              <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12 bg-white dark:bg-gray-900 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
                  <p className="font-medium">RecipeHub &copy; {new Date().getFullYear()}. Built with React & Tailwind CSS.</p>
                  <p className="text-sm mt-2">Data provided by TheMealDB API.</p>
                </div>
              </footer>
            </div>
          </Router>
        </ProfileProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;