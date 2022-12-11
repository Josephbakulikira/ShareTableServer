import SaveToExcel from "./components/SaveToExcel.js";
import SaveToJSON from "./components/SaveToJSON.js";
import { useEffect } from "react";

const Header = ({ columns, addColumn, rows, addRow, room, project, user }) => {
  useEffect(()=>{

  },[])
  return (
    <div className="row mb-5 headerboss">
      <div className="col-md-10 mt-5 mx-auto d-flex align-items-center justify-content-around" style={{flexWrap: "wrap"}}>
        <div className="roomheading p-4" style={{backgroundColor: "white", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
          <h5><span style={{color: "rgb(24, 100, 155)", textTransform: "uppercase"}}>{room.name}</span></h5>
          <h6><span style={{color: "rgb(40, 130, 255)"}}>{project.name}</span></h6>
          <h6><span style={{color: "gray"}}>{user.name}</span></h6>
          <hr style={{color: "black"}}/>
          <a href="javascript:history.go(-1)"><button className="btn-hover color-4">SORTIR</button></a>
        </div>
        
        <div className="d-flex align-items-center justify-content-end gap-1" style={{flexWrap: "wrap"}}>
          <div className="gap-2" style={{display: "grid", gridTemplateColumns: "repeat(1, auto)"}}>
            <div className="d-flex justify-content-around"><p className="my-0">Colonne: {columns.length}</p>
          <p className="my-0">Ligne: {rows.length}</p></div>
          
          <button
            onClick={() => addColumn()}
            type="button"
            className="ms-1 btn btn-outline-dark" style={{color: "white", borderColor: "white"}}
          >
            Ajouter colonne
          </button>
          <button
            onClick={() => addRow()}
            type="button"
            className=" btn btn-outline-dark" style={{color: "white", borderColor: "white"}}
          >
            Ajouter ligne
          </button>
          <SaveToJSON columns={columns} rows={rows}/>
          <SaveToExcel columns={columns} rows={rows}/>

          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Header;
