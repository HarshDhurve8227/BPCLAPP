// App.js
import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Products from './Components/Product';
import InsertProduct from './Components/InsertProduct';
import UpdateProduct from './Components/UpdateProduct';
import About from './Components/RackandA';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Toaster } from 'react-hot-toast';
import FireFight from './Components/FireFight';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Technician from './Components/Technician';
import ChecklistForm from './Components/checklistform';
import SOPadminandsecurity from './Components/SOPadminandSecu';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavbarWithConditionalRendering />
          <Toaster />
          <Routes>
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/products" element={<PrivateRoute element={<Products />} />} />
            <Route path="/insertproduct/:department" element={<PrivateRoute element={<InsertProduct />} />} />
            <Route path="/updateproduct/:department/:id" element={<PrivateRoute element={<UpdateProduct />} />} />
            <Route path="/about" element={<PrivateRoute element={<About />} />} />
            <Route path="/firefight" element={<PrivateRoute element={<FireFight />} />} />
            <Route path="/technician" element={<PrivateRoute element={<Technician />} />} />
            <Route path="/adminandsecurity" element={<PrivateRoute element={<SOPadminandsecurity/>} />} />


            <Route path="/AS11" element={<PrivateRoute element={<ChecklistForm />} />} />


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function NavbarWithConditionalRendering() {
  const location = useLocation();
  const hideNavbarRoutes = ['/register', '/'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar title='HOME' about="About" />}
    </>
  );
}

export default App;
