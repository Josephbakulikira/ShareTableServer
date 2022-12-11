import React, {useState, useEffect} from 'react'
import { IntlProvider } from 'react-intl'
import Layout from '../components/sidebar/layout'
import {useNavigate} from 'react-router-dom';

function Profile() {
    const [currentUser, setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
        let localuser = localStorage.getItem("currentUser")
        if(localuser){
            setUser(JSON.parse(localStorage.getItem("currentUser")).data);
        }else{
            navigate("/login")
        }
    }, [])
  return (
    <IntlProvider>
        <Layout>

                <div>
                    {currentUser && <div className='justify-content-center m-3 myprofile' style={{display: "grid", alignItems: "center",gridTemplateColumns: "repeat(1, auto)"}}>
                        <h1><b>Nom :</b> {currentUser.name}</h1>
                        <hr/>
                        <h3><b>Email :</b> {currentUser.email}</h3>
                        <hr/>
                        <h3><b>Department :</b> {currentUser.departement}</h3>
                        <hr/>
                        <h6>date de creation de votre compte: {currentUser.createdAt}</h6>

                    </div>}
                </div>
            
        </Layout>
    </IntlProvider>
  )
}

export default Profile