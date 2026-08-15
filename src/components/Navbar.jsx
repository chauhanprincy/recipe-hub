import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Utensils, Heart, Moon, Sun, UserCircle2, LogIn, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useProfile } from "../context/ProfileContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isSignedIn, signOut } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary-500 rounded-lg group-hover:bg-primary-600 transition-colors">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
              RecipeHub
            </span>
          </Link>

          <div className="flex items-center space-x-4 sm:space-x-8">
            {isSignedIn && (
              <>
                <Link
                  to="/"
                  className={`font-medium transition-colors hover:text-primary-500 ${isActive("/") ? "text-primary-500" : "text-gray-600 dark:text-gray-300"}`}
                >
                  Home
                </Link>
                <Link
                  to="/favorites"
                  className={`flex items-center space-x-1 font-medium transition-colors hover:text-primary-500 ${isActive("/favorites") ? "text-primary-500" : "text-gray-600 dark:text-gray-300"}`}
                >
                  <Heart
                    className={`h-4 w-4 ${isActive("/favorites") ? "fill-primary-500 text-primary-500" : ""}`}
                  />
                  <span>Favorites</span>
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 font-medium transition-colors hover:text-primary-500 ${isActive("/profile") ? "text-primary-500" : "text-gray-600 dark:text-gray-300"}`}
                >
                  <UserCircle2 className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </>
            )}

            {isSignedIn ? (
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-primary-500"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-1 font-medium transition-colors hover:text-primary-500 ${isActive("/login") ? "text-primary-500" : "text-gray-600 dark:text-gray-300"}`}
              >
                <LogIn className="h-4 w-4" />
                <span>Sign in</span>
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;