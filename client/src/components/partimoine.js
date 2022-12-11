import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import myUrl from "../URL";
import { FaBell, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "../pages/css/patrimoine.css"

function PatrimoineTab({ user }) {
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [selected, setSelected] = useState();
  const componentRef = useRef();
  const [printBillModalVisibility, setPrintBill] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  useEffect(() => {
    get_all_files();
  }, []);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  function HandleClick(file) {
    setSelected(file);
    handleShow();
  }

  async function get_all_files() {
    try {
      const serveurs = await axios.post(myUrl + "/api/patrimoines/get-all-files", {
        userid: user._id,
      });
      setFiles(serveurs.data);
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function delete_all_file(){
    try {
      const res = await axios.post(myUrl + "/api/patrimoines/delete-all", {
        userid: user._id
      });
      if (res) {
        toast("fiche supprimé");
        get_all_files();
        handleClose2();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  async function delete_file(id) {
    try {
      const res = await axios.post(myUrl + "/api/patrimoines/delete-file", {
        userid: user._id,
        fileid: id,
      });
      if (res) {
        toast("fiche supprimé");
        get_all_files();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const handleToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div className="d-flex justify-content-center">
        <button className="btn-hover color-3" onClick={handleToPrint}>
          Imprimer
        </button>
      </div>
      <div className="row p-3" ref={componentRef}>
        <div>
          <h4 className="text-center" style={{ textDecoration: "underline" }}>
            ICR / SERVICES TECHNIQUES TRAVAUX
          </h4>
          
          <br />
          <h5 className="text-center">
            INVENTAIRE DU MOBILIER ET EQUIPEMENTS PRESENT SUR ICR
          </h5>
          <hr />
        </div>
        <div className="col-md-12">
          <div style={{ overflowX: "auto" }}>
            <table className="table table-bordered table-light" style={{backgroundColor: 'white'}}>
              <thead className="box-shadow3">
                <tr>
                  <th>Date</th>
                  <th>Niveau</th>
                  <th>localisation ICR</th> 
                  <th>local Depart</th>
                  <th>Descriptif sommaire du mobilier</th>
                  <th>dimensions</th>
                  <th>Etat (O=transferable/N=non transferable)</th>
                  <th>QUANTITE</th>
                  <th>Date d'expiration</th>
                  <th>CODE BARRE ICR</th>
                </tr>
              </thead>
              <tbody>
                {files.length &&
                  [...files].reverse().map((file) => {
                    return (
                      <tr key={file._id}>
                        <td>{file.createdAt.substring(0, 10)}</td>
                        <td>{file.niveau}</td>
                        <td>{file.localisation}</td>
                        <td>{file.localdepart}</td>
                        <td>{file.description}</td>
                        <td>{file.dimensions}</td>
                        <td>{file.etat}</td>
                        <td>{file.quantity}</td>
                        <td>{file.expirationdate}</td>
                        <td>{file.codebare}</td>
                        {/* <th>{file.quantity}</th> */}

                        <td>
                          <button
                            onClick={() => HandleClick(file)}
                            className="btn btn-danger "
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
          <button className="btn-hover color-11" onClick={handleShow2}>Supprimer tout</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alerte</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez-vous supprimer cette Liste</Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button className="btn-hover color-6" onClick={handleClose}>
              Annuler
            </button>
            <button
              className="btn-hover color-11"
              onClick={() => delete_file(selected._id)}
            >
              Supprimer
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Alerte</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tvoulez-vous supprimer toutes les fiches ?</Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button className="btn-hover color-6" onClick={handleClose2}>
              Annuler
            </button>
            <button
              className="btn-hover color-11"
              onClick={() => delete_all_file()}
            >
              Supprimer
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PatrimoineTab;
