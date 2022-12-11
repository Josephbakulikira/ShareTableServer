import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { ToastContainer} from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home';
import ProjectTable from "./project";
import Login from './pages/login.js';
import Register from "./pages/register.js";

import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Serveur from "./pages/Serveur";
import Access from "./pages/access";
import Profile from "./pages/profile";
import AdminPage from "./pages/admin";
import AboutPage from "./pages/about";

const App = () => {
  

  return (
    <BrowserRouter>
      <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/servers/:serverid/:projectid" element={<ProjectTable/>}/>

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/servers/:id" element={<Serveur/>} />
        <Route path="/access/:id" element={<Access/>} />
        <Route path="/users/:id" element={<Profile/>} />
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
      </Routes>
      <ToastContainer />
      </div>

    </BrowserRouter>
  );
};

export default App;
