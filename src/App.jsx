import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/favorites" element={<Favorites />} />
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
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
