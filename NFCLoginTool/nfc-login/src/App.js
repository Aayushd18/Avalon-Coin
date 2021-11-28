import React from 'react';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


  const App = () => {
    

    return (
      <Router>
         <Routes>
           <Route path='/' element={<Login />} />
           <Route path='/home' element={<Dashboard />} />
           <Route path='/about' element={<About />} />

         </Routes>
      </Router>
    );
};
export default App;