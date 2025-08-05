import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/strore.js'
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_APP_ACCESS}`;
// console.log('Environment variable:', import.meta.env.VITE_APP_ACCESS);
// console.log('Authorization header:', axios.defaults.headers.common['Authorization']);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
    </Provider>
  </StrictMode>
)
