# RecipeHub

A modern, fully responsive Recipe Finder Application built with React.js and Tailwind CSS. RecipeHub allows users to discover new meals, search by ingredients or names, view detailed instructions, and save their favorite recipes for later.

## Features

- 🔍 **Search Recipes**: Find recipes by name or main ingredient.
- 📖 **Detailed Views**: View complete recipe details including ingredients, measurements, instructions, and video tutorials.
- ❤️ **Favorites**: Save your favorite recipes to your local storage so they persist across sessions.
- 🌓 **Dark Mode**: Premium sleek dark mode and light mode, togglable with a single click.
- 📱 **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop.
- ⚡ **Fast & Dynamic**: Built with Vite and React for lightning-fast performance.

## Tech Stack

- **Framework**: React.js 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: TheMealDB (Free Public API)
- **State Management**: React Context API & Custom Hooks (LocalStorage)

## Installation & Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd RecipeHub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment

This project is configured to be easily deployed on Vercel. 
To deploy:
1. Push the code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. The default settings for Vite will automatically be detected (`npm run build` for Build Command and `dist` for Output Directory).
4. Click Deploy!

## API Used

**TheMealDB**: An open, crowd-sourced database of Recipes from around the world.
- Base URL: `https://www.themealdb.com/api/json/v1/1/`
- Documentation: [TheMealDB API](https://www.themealdb.com/api.php)

## License
MIT
