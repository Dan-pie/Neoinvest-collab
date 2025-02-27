import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"

import App from './App.jsx'
import ConteMais from './pages/ConteMais.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/ConteMais',
    element: <ConteMais />
  },
  {
    path: '/Dashboard',
    element: <Dashboard />
  },
  {
    path: '/Home',
    element: <Home />
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
