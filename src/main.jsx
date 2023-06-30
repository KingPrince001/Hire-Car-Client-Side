import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import {ProSidebarProvider} from 'react-pro-sidebar';
import { ContextProvider } from './context/userContext/context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <ContextProvider>
      <ProSidebarProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </ProSidebarProvider>
      </ContextProvider>
     
    </div>
   
  </React.StrictMode>,
)
