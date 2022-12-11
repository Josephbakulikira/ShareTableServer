import React, {useEffect, useState, useContext} from 'react';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaPlus, FaList, FaGithub, FaRegLaughWink, FaHeart, FaTwitter, FaUser, FaLock, FaAngleRight,FaCashRegister } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../../context/AuthContext.js';
import {toast} from 'react-toastify';
import myUrl from '../../URL';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar, handleCollapsedChange }) => {
  const [currentUser, setCurrentUser] = useState();
  const {loggedIn, GetLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const intl = useIntl();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [localisation, setLocalisation] = useState("");
  const [localdepart, setLocalDepart] = useState("");
  const [etat, setEtat] = useState("");
  const [description, setDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [quantity, setQuantity] = useState("");
  const [codebare, setCodebare] = useState("");
  const [niveau, setNiveau] = useState(1);
  const [expirationdate, setExpirationDate] = useState(new Date())

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'darkCyan';
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function Logout(){
    try{
      await axios.get(myUrl + "/api/users/logout")
      await GetLoggedIn();
      // localStorage.setItem("currentUser", JSON.stringify(userData))
      localStorage.clear()
      toast.info(`the user is loggedOut`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      navigate("/login")
    }catch(err){
      toast(err)
    }
    
  }

  async function submitFiche(){
  // console.log(currentUser)
    console.log({localisation,
      localdepart,
      description,
      dimensions,
      etat,
      quantity,
      codebare,
      userid: currentUser._id,
      niveau,
      expirationdate})
    try{
      // console.log("herer for never")
      const res = await axios.post(myUrl + "/api/patrimoines/add-file", {
        localisation,
        localdepart,
        description,
        dimensions,
        etat,
        quantity,
        codebare,
        userid: currentUser._id,
        niveau,
        expirationdate
      })
      // console.log("here for now !")
      if(res){
        toast.success("Creation de fiche Reussi")
        setLocalDepart("")
        setLocalisation("")
        setDescription("")
        setDimensions("")
        setEtat("")
        setQuantity("")
        setCodebare("")
        setNiveau(1)
        closeModal();
      }
    }catch(error){
      console.log(error)
      toast.error("Probleme de connection")
    }

  }

  useEffect(()=>{
    try{
      const data = JSON.parse(window.localStorage.getItem("currentUser")).data
      setCurrentUser(data);
      // console.log(data)
    }catch(err){
      navigate("/login")
      // console.log(err)
    }
  },[])

  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader onClick={handleCollapsedChange}>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <h1>S.T.S</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
          >
            <Link to="/">{intl.formatMessage({ id: 'dashboard' })}</Link>
          </MenuItem>
          <MenuItem icon={<FaUser />}> {currentUser && <Link to={`/users/${currentUser._id}`}>{currentUser.name}</Link>}</MenuItem>
        </Menu>
        <Menu iconShape="circle">
        {currentUser && currentUser.status === "ADMIN" && <MenuItem icon={<FaLock/>} > <Link to="/admin">Admin</Link> </MenuItem>}
        <MenuItem icon={<FaGem/>} > <Link to="/about">A Propos</Link> </MenuItem>


        </Menu>

        <Menu iconShape="circle">
        <MenuItem icon={<FaAngleRight/>} onClick={Logout}>Se Deconnecter</MenuItem>

        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://twitter.com/JosephBakl"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaTwitter />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {intl.formatMessage({ id: 'viewSource' })}
            </span>
          </a>
        </div>
      </SidebarFooter>
      
    </ProSidebar>
  );
};

export default Aside;