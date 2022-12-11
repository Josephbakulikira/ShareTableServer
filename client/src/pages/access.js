import React, {useState, useEffect} from 'react'
import {useMatch, useNavigate} from 'react-router-dom'
import { IntlProvider } from 'react-intl';
import Layout from '../components/sidebar/layout';
import messages from '../messages';
import "./css/access.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import myUrl from '../URL';

function Access() {
    const [locale, setLocale] = useState("en");
    const [password, setPassword] = useState("")
    const [userid, setUserid] = useState("")
    const parameters = useMatch("/access/:id").params
    const navigate = useNavigate()
    // const [roomname, setroomname]
    useEffect(()=>{
        const local_user = JSON.parse(window.localStorage.getItem("currentUser"))
        if(local_user){
            setUserid(local_user.data._id)
        }
    }, [])

    async function Confirm(e){
        e.preventDefault()
        try{
            if(userid !== ""){
                const res = await axios.post(myUrl + "/api/rooms/addusertoroom", {room_id: parameters.id, user_id: userid, password: password})
                
                toast("Vous pouvez acceder les serveurs,...")
                // window.location.reload();
                navigate("/servers/"+parameters.id);
            }else{
                toast.error("no permission")
            }
            
        }catch(err){
            toast.error("Incorrect password")
        }
    }



  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout setLocale={setLocale}>
            <div>
                <h3 style={{textAlign: "center"}}>Mettez le mot de passes du serveur, pour avoir l'accée</h3>
                <br/>
                <hr/>
            </div>
        <div className="form">
                    <form className="login-form">
                    <label style={{fontWeight: "bold"}}>Serveur ID:</label>
                    <input value={parameters.id} type="text" readOnly/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="mot de passe" placeholder="motdepasse"/>
                    <button onClick={Confirm} className="confirmbutton">CONFIRMER</button>
                    </form>
                </div>
        </Layout>
      </IntlProvider>
    </>
  )
}

export default Access