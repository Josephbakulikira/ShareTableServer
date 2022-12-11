import React,{useState, useEffect} from 'react'
import { IntlProvider } from 'react-intl'
import Layout from '../components/sidebar/layout'
import {useNavigate } from 'react-router-dom';
import {Tabs,Tab} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios from 'axios'
import UsersTab from '../components/usersTab';
import RoomsTab from '../components/RoomsTab';
import ProjectTab from '../components/projectTab';
import FilesTab from '../components/filesTab';
import PatrimoineTab from '../components/partimoine';

function AdminPage() {
    const [currentUser, setUser] = useState()
    const [key, setKey] = useState('home');
    const navigate = useNavigate();

    useEffect(()=>{
        let localuser = localStorage.getItem("currentUser")
        if(localuser){
            setUser(JSON.parse(localStorage.getItem("currentUser")).data);
            if(JSON.parse(localStorage.getItem("currentUser")).data.status !== "ADMIN"){
                navigate("/")
            }
        }else{
            navigate("/login")
        }
    }, [])
  return (
    <IntlProvider>
        <Layout>
        {currentUser && <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            >
            <Tab eventKey="home" title="Utilisateurs">
                <UsersTab user={currentUser}/>
            </Tab>
            <Tab eventKey="profile" title="serveurs">
                <RoomsTab user={currentUser} />

            </Tab>
            <Tab eventKey="contact" title="projets">
                <ProjectTab user={currentUser}/>

            </Tab>
            <Tab eventKey="files" title="Fiches">
                <FilesTab user={currentUser}/>

            </Tab>
            <Tab eventKey="Gestiondepatrimoine" title="Gestion de patrimoine">
                <PatrimoineTab user={currentUser}/>

            </Tab>
            </Tabs>}
        </Layout>
    </IntlProvider>
  )
}

export default AdminPage

