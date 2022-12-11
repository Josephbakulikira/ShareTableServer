import React, {useState, useEffect} from 'react'
import "./css/loginregister.css"
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios';
import myUrl from '../URL';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const locals = window.localStorage.getItem("currentUser");

    if(locals){
        navigate("/")
    }

},[])

  async function SubmitRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const registerData = {
        name,
        email,
        phonenumber,
        password,
        confirmPassword,
      };

      await axios.post(myUrl + "/api/users/register", registerData);
      toast.success(
        "You Have Successfully registered in to Auctux Dashboard, Welcome",
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
      const navigating = () => navigate("/login");
      setLoading(false);
      setTimeout(navigating, 1000);
    } catch (err) {
      setLoading(false);
      // console.log(err.message)
      toast.error(`${err.message}`, {
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
  return (
    <div>
    <div className="login-page">
      <div className="form">
          <h3>S'INSCRIRE</h3>
          <hr/>
          <form className="login-form">
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="nom - post-nom - prenom"/>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="mail"/>
            <input value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} type="number" placeholder="numero telephone"/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="mot de passe"/>
            <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder="confirmer mot de passe"/>
            <button onClick={SubmitRegister}>S'inscrire</button>
            <p className="message">avez-vous deja un compte? <Link href="#" to="/login">Se Connecter</Link></p>
          </form>
      </div>
      </div>
 </div>
  )
}

export default Register