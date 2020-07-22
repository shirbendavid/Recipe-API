import Main from './pages/MainPage'
import NotFound from './pages/NotFoundPage'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./pages/RegisterPage'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/LoginPage'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./pages/SearchPage'),
  },
  {
    path: '/recipe/:recipeId',
    name: 'recipe',
    component: () => import('./pages/RecipeViewPage'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/AboutPage'),
  },

  {
    path: '/favoritesRecipes',
    name: 'favoritesRecipes',
    component: () => import('./pages/FavoritePage'),
    meta: { requiresAuth: true },
  },
  {
    path: '/personalRecipes',
    name: 'personalRecipes',
    component: () => import('./pages/ParsonalPage'),
    meta: { requiresAuth: true },
  },
  {
    path: '/famliyRecipes',
    name: 'famliyRecipes',
    component: () => import('./pages/FamliyPage'),
    meta: { requiresAuth: true },
  },
  {
    path: '/parsonalRecipe/:recipe_id',
    name: 'parsonalRecipe',
    component: () => import('./pages/ParsonalRecipeViewPage'),
    meta: { requiresAuth: true },
  },
  {
    path: '/famliyRecipe/:recipe_id',
    name: 'famliyRecipe',
    component: () => import('./pages/FamliyRecipeViewPage'),
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
]

export default routes
