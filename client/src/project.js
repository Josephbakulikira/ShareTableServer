import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Header, Table } from "./components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useMatch, useNavigate } from "react-router-dom";
import myUrl from "./URL";
import { Spinner } from "react-bootstrap";

const ProjectTable = () => {
  const [columns, setColumns] = useState(["Column 1"]);
  const [rows, setRows] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [server, setServer] = useState();
  const [thisproject, setThisproject] = useState();
  // const navigate = useNavigate();
  const parameters = useMatch("/servers/:serverid/:projectid").params;

  useEffect(() => {
    const myuser = JSON.parse(window.localStorage.getItem("currentUser")).data;
    // console.log(myuser)
    if (myuser) {
      setCurrentUser(myuser);
      GetServer();
      GetProject();
    }
  }, []);

  async function GetServer() {
    try {
      const Server = await axios.post(myUrl + "/api/rooms/getroombyid", {
        room_id: parameters.serverid,
        user_id: JSON.parse(window.localStorage.currentUser).data._id,
      });
      if (Server) {
        // console.log(Server)
        setServer(Server.data);
      } 
    } catch (err) {
      toast.error(err.message)
    }
  }
  async function GetProject() {
    try{
      const myProject = await axios.post(myUrl + "/api/projects/singleproject", {
        roomId: parameters.serverid, 
        projectId: parameters.projectid,
        userId: JSON.parse(window.localStorage.currentUser).data._id,
      
      })
      if(myProject){
        setThisproject(myProject.data)
        // console.log(myProject.data)
        // console.log(myProject.data)
        if(myProject.data.rows.length > 0 || myProject.data.cols.length > 0){
          setRows(myProject.data.rows);
          setColumns(myProject.data.cols)
        }
        // console.log(myProject.data)
      }
    }catch(err){
      toast.error(err.message)
      console.log("the error is here")
    }
  }

  const addColumn = () => {
    if (columns.length < 30) {
      setColumns((prevColumns) => [
        ...prevColumns,
        `colonne${prevColumns.length + 1}`,
      ]);
      if (rows.length > 0) {
        setRows((prevRows) => prevRows.map((row) => [...row, ""]));
      }
    } else {
      toast.dark("votre maximu est de 30!");
    }
  };

  const addRow = (index, valeur) => {
    // console.log(valeur)
    if(valeur === ""){
      setRows((prevRows) => [...prevRows, columns.map((col) => "")]);
    }else{
      setRows((prevRows) => [...prevRows, columns.map((col) => {
        if(col === index){
          // console.log(valeur)
          return valeur
        }else{
          return ""
        }
      })]);
    }
  };

  return (
    <div className="container-fluid">
      {(thisproject !== undefined && server !== undefined && currentUser !== undefined) ? (
        <>
          <Header
            columns={columns}
            rows={rows}
            addColumn={addColumn}
            addRow={addRow}
            room={server}
            user={JSON.parse(window.localStorage.currentUser).data}
            project={thisproject}
          />
          <Table
            columns={columns}
            rows={rows}
            addRow={addRow}
            addColumn={addColumn}
            setColumns={setColumns}
            setRows={setRows}
            room={server}
            user={JSON.parse(window.localStorage.currentUser).data}
            project={thisproject}
          />
        </>
      ) : (
        <Spinner animation="border" role="status" >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default ProjectTable;
