import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Employee } from './Employee.jsx'
import { Events } from './Events.jsx'
import { Checkin } from './Checkin.jsx'

import './index.css'
import 'vite/modulepreload-polyfill'

import {
  createHashRouter,
  Router,
  RouterProvider,
} from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Employee />,
        // children: [
        //   { 
        //     path: "/employee/checkin",
        //     element: <Checkin />,
        //   }
        // ]
      },
      {
        path: "/events",
        element: <Events />,
      },
      { 
        path: "/employee/checkin",
        element: <Checkin />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
