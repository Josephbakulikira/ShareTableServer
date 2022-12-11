import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/cardproject.css";
import { FaPlus, FaTrash, FaArrowRight, FaFileDownload } from "react-icons/fa";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import gradient from "random-gradient";
import myUrl from "../URL";
import SaveToJSON from "./Header/components/SaveToJSON";
import SaveToExcel from "./Header/components/SaveToExcel";

function ServerProject({ data, serverid, serverpassword }) {
  const [currentUser, setCurrentUser] = useState();
  const [projectname, setProjectname] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedCreator, setSelectedCreator] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (e, project_id, mycreatorid) => {
    setSelectedProject(project_id);
    setSelectedCreator(mycreatorid);
    setShow2(true);
  };

  useEffect(() => {
    const myUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (myUser) {
      setCurrentUser(myUser.data);
      GetAllProjects();
    } else {
      navigate("/login");
    }
  }, []);

  async function CreateProject(e) {
    e.preventDefault();
    try {
      if (projectname !== "") {
        const tableau = await axios.post(myUrl + "/api/projects/addproject", {
          name: projectname,
          creatorId: currentUser._id,
          roomId: serverid,
          maximum: 5,
          history: [],
          users: [currentUser._id],
        });
        toast.success("creation du tableau réussie .", { theme: "colored" });
        await GetAllProjects();
        handleClose();
      } else {
        toast.error("votre tableau doit avoir un nom !", { theme: "colored" });
      }
    } catch (err) {
      toast.error(err, { theme: "dark" });
    }
  }

  async function GetAllProjects() {
    try {
      const projects = await axios.post(myUrl + "/api/projects/getallroomprojects", {
        room_id: serverid,
        room_password: serverpassword,
      });
      setProjects(projects.data);
    } catch (errors) {
      toast.error(errors.message, { theme: "dark" });
    }
  }

  async function DeleteProject() {
    try {
      const deletionmessage = await axios.post(
        myUrl + "/api/projects/deleteproject",
        {
            room_id: serverid, 
            project_id: selectedProject,
            password: serverpassword, 
            user_id: currentUser._id,
            creatorId: selectedCreator
        }
      );
      toast("un tableau a été supprimé ")
      GetAllProjects()
      handleClose2()
    } catch (err) {
      toast.error(err.message, { theme: "dark" });
    }
  }

  return (
    <>
      <div className="mainWrapper">
        <div
          className="cardproject"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <FaPlus onClick={handleShow} color="white" size="100" />
        </div>
        {projects.map((el) => {
          const bgGradient = { background: gradient(el._id) };
          return (
            <div className="cardproject2" style={bgGradient} key={el._id}>
              <h1>{el.name}</h1>
              <br />
              <div className="m-2">
              <SaveToExcel columns={el.cols} rows={el.rows}/>
              </div>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <button onClick={(e) => handleShow2(e, el._id, el.creatorId)} className="btn trashIcon1" trashIcon>
                  <FaTrash
                    
                    style={{}}
                    size="30"
                  />
                </button>
                <button onClick={()=>navigate(`/servers/${serverid}/${el._id}`)} className="btn btn-success trashIcon" trashIcon>
                  <FaArrowRight
                    
                    style={{}}
                    size="30"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Créer projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={projectname}
            className="form-control"
            placeholder="Nom du tableau"
            onChange={(e) => setProjectname(e.target.value)}
          />
          {/* <select className="form-select" aria-label="Default select example">
            <option>Tableau</option>
            <option>Gestion Patrimoine</option>

          </select> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={CreateProject}>
            Créer
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>voulez-vous supprimer ce fichier ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Annuler
          </Button>
          <Button variant="danger" onClick={DeleteProject}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ServerProject;
