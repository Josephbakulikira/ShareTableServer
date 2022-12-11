import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./css/loginregister.css"
import { useNavigate, Link } from "react-router-dom";
import myUrl from "../URL";

function Login() {
    const [loading, setloading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toggler = useRef();
    const formref = useRef();
    const navigate = useNavigate()

    async function submitLogin(e) {
        e.preventDefault();

        try {
        setloading(true);
        const loginData = {
            email,
            password,
        };
        const userData = await axios.post(myUrl + "/api/users/login", loginData);
        toast.success(
            "You Have Successfully Logged in to Auctux Dashboard, Welcome",
            {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }
        );
        localStorage.setItem("currentUser", JSON.stringify(userData));
        // console.log(userData);
        setloading(false);
        navigate("/")
        } catch (err) {
        setloading(false);
        toast.error("Wrong Credentials, try again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }
    }

    useEffect(()=>{
        const locals = window.localStorage.getItem("currentUser");

        if(locals){
            navigate("/")
        }

    },[])

  return (
    
          <div>
              <div className="login-page">
                <div className="form" ref={formref}>
                    <form className="login-form">
                    <h3>SE CONNECTER</h3>
                    <hr/>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="mail"/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="motdepasse"/>
                    <button onClick={submitLogin}>Se Connecter</button>
                    <p className="message">vous n'avez pas un compte? <Link href="#" to="/register">S'inscrire</Link></p>
                    </form>
                </div>
                </div>
           </div>
    
  )
}

export default Login