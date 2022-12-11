import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import { IntlProvider } from "react-intl";
import Layout from "../components/sidebar/layout.js";
import messages from "../messages.js";
import "../style/Home.scss";
import "./css/home.css";
import { Container, Row, Col } from "react-bootstrap";
import "react-clock/dist/Clock.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import myUrl from "../URL.js";
import ReactDOM from 'react-dom';
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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Home() {
  const [locale, setLocale] = useState("en");
  const [value, setValue] = useState(new Date());
  const [serverName, setServerName] = useState("");
  const [serverPassword, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [servers, setServers] = useState([]);
  const [notifications, setNotifations] = useState([]);
  const [localUser, setLocalUser] = useState("");

  const [ficheName, setFicheName] = useState("");
  const [ficheOffice, setFicheoffice] = useState("");
  const [ficheDivision, setFicheDivivision] = useState("");
  const [ficheDescription, setDescription] = useState("");
  const [ficheProposition, setProposition] = useState("");
  const [cout, setCout] = useState("");
  const [observation, setObservation] = useState("");



  const navigate = useNavigate();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'darkCyan';
  }
  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'darkCyan';
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModal2() {
    setIsOpen2(false);
  }
  async function GetAllRooms() {
    try {
      const rooms = await axios.post(
        myUrl + "/api/rooms/getallrooms", {userid: JSON.parse(localStorage.currentUser).data._id}
      );
      if (rooms.data) {
        setServers(rooms.data);
      }
    } catch (errors) {
      toast.error(errors.message);
    }
  }

  async function deleteServer(room_id, user_id){
    try{
      const res = await axios.post(myUrl + "/api/rooms/deleteroom", {room_id, user_id})
      toast(res);
      // CreateNotification(localUser, " a supprimé le serveur " + room_id);
      const response = GetAllRooms();
      
      toast(`${room_id} supprimé`, {theme: "dark"})
      await CreateNotification(localUser, ", serveur supprimé")
      await GetAllNotifications()
    }catch(err){
      toast(err.message)
    }
  }

  async function CreateNotification(user_id, notification_message){
    try{
      const res = await axios.post(myUrl + "/api/notifications/addnotification", {id:user_id, content: notification_message})

      toast(res, {theme: "dark"})
      // CreateNotification(localUser, " a crée un serveur");
      // GetAllNotifications();

    }catch(error){
      toast.error(error.message)
    }
  }
  async function AddServer(e) {
    e.preventDefault();
    // console.log(
    //   JSON.parse(window.localStorage.getItem("currentUser")).data._id
    // );
    try {
      if (serverName !== "") {
        if (serverPassword === confirmPassword && serverPassword !== "") {
          const res = await axios.post(
            myUrl + "/api/rooms/addroom",
            {
              name: serverName,
              creatorId: JSON.parse(window.localStorage.getItem("currentUser"))
                .data._id,
              password: serverPassword,
              history: [
                {
                  id: JSON.parse(window.localStorage.getItem("currentUser"))
                    .data._id,
                  type: "a crée un nouveau serveur",
                },
              ],
              users: [
                JSON.parse(window.localStorage.getItem("currentUser")).data._id,
              ],
              files: [],
            }
          );
          //CreateNotification(localUser, " a crée un nouveau serveur" )
          // GetAllNotifications()
          // setNotifations([
          //   ...notifications,
          //   {
          //     name: JSON.parse(window.localStorage.getItem("currentUser")).data
          //       .name,
          //     type: "a crée un nouveau serveur",
          //   },
          // ]);

          toast("votre serveur a été créer");
          await GetAllRooms();
          await CreateNotification(localUser, " à creér un serveur")
          await GetAllNotifications()
          // CreateNotification(localUser, " a crée un nouveau serveur" )
        } else {
          toast.error("les deux mot de passes ne sont pas le meme !");
        }
      } else {
        toast.error("votre serveur n'a pas de nom !");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function GetAllNotifications() {
    try{
      const mynotifications = await axios.get(myUrl + "/api/notifications/getallnotifications")
      if(mynotifications){
        if(mynotifications.data.length > 0){
          setNotifations(mynotifications.data);
        }
      }
      console.log("getting all notifications")

    }catch(err){
      toast.error(err.message, {theme: "dark"})
    }
      
  }

  useEffect(() => {
    const locals = window.localStorage.getItem("currentUser");
    if (!locals) {
      navigate("/login");
    } else if (!JSON.parse(locals).data._id) {
      navigate("/login");
    } else {
      setLocalUser(JSON.parse(locals).data._id);
    }

    GetAllRooms();
    GetAllNotifications();
    // GetAllNotifications();
    
  }, []);
  
  async function submitFiche(){
    try{
      const res = await axios.post(myUrl + "/api/files/add-file", {
        userid: JSON.parse(localStorage.currentUser).data._id,
        description: ficheDescription,
        office: ficheOffice,
        solution: ficheProposition,
        observation: observation,
        amount: cout,
        division: ficheDivision,
        name: JSON.parse(localStorage.currentUser).data.name,})
      if(res){
        toast.success("Creation de fiche Reussi")
        setDescription("")
        setFicheoffice("")
        setProposition("")
        setObservation("")
        setCout("")
        setFicheDivivision("")
        closeModal();
      }
    }catch(error){
      console.log(error)
      toast.error("Probleme de connection")
    }

  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout setLocale={setLocale}>
        <div className="mainContainer2">
          <Row className="justify-content-md-center headerContainerHome">
            <div style={{ display: "block", height: "20px" }}></div>

            <Col sm="12" md="12" xs="12" lg="4">
              <div className="roomCounter">
                <h5>Notifications</h5>
                <hr />
                <div className="notification p-2">
                  {notifications.length > 0 ? (
                    notifications.map((el) => {
                      return (
                        <p key={el._id}>
                          <span>{el.name}</span> {el.content}
                        </p>
                      );
                    })
                  ) : (
                    <p>pas notifications disponible</p>
                  )}
                </div>
              </div>
            </Col>
            <Col sm="12" md="12" xs="12" lg="8">
              <div>
                <form>
                  <input
                    className="roomForm form-control"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    type="text"
                    placeholder="nom du serveur"
                    
                  />
                  <input
                    className="roomForm form-control"
                    value={serverPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="mot de passe du serveur"
                  />
                  <input
                    className="roomForm form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirm(e.target.value)}
                    type="password"
                    placeholder="confirmer mot de passe"
                  />
                  <div className="d-flex justify-content-center">
                    <button className="btn-hover color-5" onClick={AddServer}>
                      Créer un Serveur
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
        <div className="m-2">
          <Row>
            <Col className="roomTiles" xs="12" lg="4">
              <h1>#Serveurs</h1>
              <hr />
              <div className="roomList">
                <ul className="listhome">
                  {servers.length > 0 ? (
                    servers.map((server) => {
                      return (
                        <li key={server._id}>
                          <Link to={`/servers/${server._id}`}>
                            # {server.name}
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <li>
                      <h4>pas des serveurs disponibles</h4>
                    </li>
                  )}
                </ul>
              </div>
              <hr />
            </Col>
            <Col xs="12" lg="8">
              <div className="textserver">
                <div>
                  <h4>Mes Serveurs</h4>
                  <hr />
                  <ul className="myul">
                    {servers
                      .filter((el, index) => {
                        if (el.creatorId === localUser) {
                          return el;
                        }
                      })
                      .map((el) => (
                        <li className="myservers" key={el.name + el._id}>
                          <Link to={"/servers/" + el._id}>{el.name}</Link>{" "}
                          <div className="d-flex gap-2">
                          <button className="btn btn-danger" onClick={()=>setIsOpen2(true)}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-danger" onClick={()=>deleteServer(el._id, localUser)}>
                            <FaTrash />
                          </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <hr style={{ color: "black" }} />
                <div className="d-flex justify-content-center">
                  <a href="mailto:bakulikiraj@gmail.com" className="btn btn-dark">Mail</a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        
      
      </Layout>
    </IntlProvider>
  );
}

export default Home;
