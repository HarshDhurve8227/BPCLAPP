// App.js
import React , {useState} from 'react';
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
import RackInsert from './Components/RackComponents/RackInsert';
import RackUpdate from './Components/RackComponents/RackUpdate';
import AMC from './Components/AmcComponents/AMC';
import AMCInsert from './Components/AmcComponents/AMCInsert';
import AMCUpdate from './Components/AmcComponents/AMCUpdate';
import RackAdmin from './Components/OfficeAdminComponents/RackAdmin';
import RackAdminUpdate from './Components/OfficeAdminComponents/RackAdminUpdate';
import ChecklistFormss from './Components/SOPAdminAndSecurity/AS10';
import TankLorryChecklist from './Components/SOPAdminAndSecurity/AS06';
import TankLorryInOutRegister from './Components/SOPAdminAndSecurity/AS8';
import PackedLorryInOutRegister from './Components/SOPAdminAndSecurity/AS9';
import MaterialInRegister from './Components/SOPAdminAndSecurity/AS12';
import MaterialOutRegister from './Components/SOPAdminAndSecurity/AS14';
import ReturnableMaterialRegister from './Components/SOPAdminAndSecurity/AS15';
import HandingOverChecklist from './Components/SOPAdminAndSecurity/AS16';
import SecurityGuardPatrolling from './Components/SOPAdminAndSecurity/AS17';






function App() {

  const [notificationCount, setNotificationCount] = useState(0);

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

            <Route path="/insertproducts/:rackNumber" element={<PrivateRoute element={<RackInsert />} />} />
            <Route path="/rackupdate/:rackNumber/:_id" element={<PrivateRoute element={<RackUpdate />} />} />
             
            <Route path="/amc" element={
    <PrivateRoute> 
      <AMC setNotificationCount={setNotificationCount} /> 
    </PrivateRoute>
  }
/>


            <Route path="/amcinsert" element={<PrivateRoute element={<AMCInsert />} />} />
            <Route path="/amcupdate/:id" element={<PrivateRoute element={<AMCUpdate />} />} />
            
            <Route path="/rackadmin" element={<PrivateRoute element={<RackAdmin />} />} />
            <Route path="/rackadmin/racks/:rackName/:_id" element={<PrivateRoute element={<RackAdminUpdate />} />} />
   
            <Route path="/as10" element={<PrivateRoute element={<ChecklistFormss />} />} />
            <Route path="/as06" element={<PrivateRoute element={<TankLorryChecklist />} />} />
            <Route path="/as08" element={<PrivateRoute element={<TankLorryInOutRegister />} />} />
            <Route path="/as09" element={<PrivateRoute element={<PackedLorryInOutRegister />} />} />
            <Route path="/as12" element={<PrivateRoute element={<MaterialInRegister />} />} />
            <Route path="/as14" element={<PrivateRoute element={<MaterialOutRegister />} />} />
            <Route path="/as15" element={<PrivateRoute element={<ReturnableMaterialRegister />} />} />
            <Route path="/as16" element={<PrivateRoute element={<HandingOverChecklist />} />} />
            <Route path="/as17" element={<PrivateRoute element={<SecurityGuardPatrolling />} />} />
            
            
            
            
            


            


            

            


            




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
