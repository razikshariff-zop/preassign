import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard';
import Products from './pages/Poducts';
import Login from './pages/Login';
import Register from './pages/Register';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />, // Shared layout
    children: [
      {path:"/",element:<Body/>},
      { path: "/products", element: <Products /> ,children:[
        
      ]},
      { path: "/pricing", element: <Pricing /> },
      { path: "/Dashboard", element: <Dashboard/> },
      { path: "/login", element: <Login /> },    
      { path: "/register", element: <Register /> }, 
  
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
