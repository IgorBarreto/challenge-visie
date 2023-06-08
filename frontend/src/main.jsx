import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home'
import PersonDetail from './routes/PersonDetail'
import PersonEdit from './routes/PersonEdit'
import PersonForm from './components/PersonForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/', element: <Home />
  },
  {
    path: '/new-person', element: <PersonForm />
  },
  {
    path: '/:id/detail', element: <PersonDetail />
  },
  {
    path: '/:id/edit', element: <PersonEdit />
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
