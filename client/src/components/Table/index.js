import { toast } from "react-toastify";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import myUrl from "../../URL";

const Table = ({
  columns,
  addColumn,
  setColumns,
  rows,
  addRow,
  setRows,
  user,
  project,
}) => {
  const [codeInput, setCodeInput] = useState("");
  const [result, setResult] = useState("");
  const [sold, setSold] = useState(project.solde);
  const [fontsize, setFontsize] = useState(15);
  const thisref = useRef();
  // console.log(project)

  const handleColumnChange = (value, index) => {
    setColumns((prevColumns) =>
      prevColumns.map((col, id) => (index === id ? value : col))
    );
  };

  const handleRowChange = (value, index, columnIndex) => {
    setRows((prevRows) =>
      prevRows.map((row, id) =>
        index === id
          ? row.map((col, colId) => (columnIndex === colId ? value : col))
          : row
      )
    );
  };

  const deleteColumn = (index) => {
    if (columns.length > 1) {
      setColumns((prevColumns) =>
        prevColumns.filter((col, id) => index !== id)
      );
      if (rows.length > 0) {
        setRows((prevRows) =>
          prevRows.map((row) => row.filter((col, id) => index !== id))
        );
      }
    } else {
      toast.dark("Minimum 1 colonne");
    }
  };

  const AdditionColumn = (index) => {
    let sum = 0;
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[i].length; j++) {
        if (j === index) {
          if (parseFloat(rows[i][j])) {
            sum += parseFloat(rows[i][j]);
          }
        }
      }
    }
    // addRow(columns[index], sum.toString())
    setResult(sum);

    // addColl()
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((row, id) => index !== id));
  };

  const multiplicationColumn = (index) => {
    let sum = 1;
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[i].length; j++) {
        if (j === index) {
          if (parseFloat(rows[i][j])) {
            sum *= parseFloat(rows[i][j]);
          }
        }
      }
    }
    // addRow(columns[index], sum.toString())
    setResult(sum);
  };
  const multiplicationRow = (index) => {
    let sum = 1;
    for (var i = 0; i < rows.length; i++) {
      if (i === index) {
        for (var j = 0; j < rows[i].length; j++) {
          try {
            sum *= parseFloat(rows[i][j]);
          } catch (error) {
            toast.error("Erreur");
          }
        }
      }
    }
    // addRow(columns[index], sum.toString())
    setResult(sum);
  };
  const AdditionRow = (index) => {
    let sum = 0;
    for (var i = 0; i < rows.length; i++) {
      if (i === index) {
        for (var j = 0; j < rows[i].length; j++) {
          try {
            sum += parseFloat(rows[i][j]);
          } catch (error) {
            toast.error("Erreur");
          }
        }
      }
    }
    // addRow(columns[index], sum.toString())
    setResult(sum);
  };

  const CodeRun = () => {
    let temp = codeInput.split(" ");
    let answer = 0;
    let col1;
    let sign = temp[1];
    let col2;
    try {
      if (columns.includes(temp[0])) {
        col1 = columns.indexOf(temp[0]);
      } else {
        toast(
          "Erreur. la premiere colonne que vous avez passé n'existe pas \n, veuillez verifier l'ortographe!"
        );
      }
      if (columns.includes(temp[2])) {
        col2 = columns.indexOf(temp[2]);
      } else {
        toast(
          "Erreur. la deuxieme colonne que vous avez passé n'existe pas \n, veuillez verifier l'ortographe!"
        );
      }
      let value = [];
      if (sign === "*" || sign === "x" || sign === "X") {
        for (var i = 0; i < rows.length; i++) {
          let row_val = 1;
          for (var j = 0; j < rows[i].length; j++) {
            if (j === col1 || j === col2) {
              row_val *= parseFloat(rows[i][j]);
            }
          }
          value.push(row_val);
        }
      }else if (sign === "/" || sign === ":") {
        for (var i = 0; i < rows.length; i++) {
          let row_val = 1;
          for (var j = 0; j < rows[i].length; j++) {
            if (j === col1 || j === col2) {
              row_val /= parseFloat(rows[i][j]);
            }
          }
          value.push(row_val);
        }
      } else if (sign === "+") {
        for (var i = 0; i < rows.length; i++) {
          let row_val = 0;
          for (var j = 0; j < rows[i].length; j++) {
            if (j === col1 || j === col2) {
              row_val += parseFloat(rows[i][j]);
            }
          }
          value.push(row_val);
        }
      } else if (sign === "-") {
        for (var i = 0; i < rows.length; i++) {
          let row_val = undefined;
          for (var j = 0; j < rows[i].length; j++) {
            if (j === col1 || j === col2) {
              if (row_val === undefined) {
                row_val = parseFloat(rows[i][j]);
              } else {
                row_val -= parseFloat(rows[i][j]);
              }
            }
          }
          value.push(row_val);
        }
      } else {
        toast(
          "cette signe d'operation n'est pas encore supporté par Chris Management software"
        );
      }

      // console.log(value)

      if (columns.length < 30) {
        setColumns((prevColumns) => [
          ...prevColumns,
          `colonne${prevColumns.length + 1}`,
        ]);
        if (rows.length > 0) {
          setRows((prevRows) => prevRows.map((row, ix) => [...row, value[ix]]));
        }
      } else {
        toast.dark("Maximum de 30 colonne");
      }
    } catch (error) {
      toast("ERREUR, Verifier s'il n'y a pas d'erreur");
    }
  };
  async function Enregistrer() {
    try {
      if (user._id === project.creatorId || user.status === "ADMIN") {
        const rs = await axios.post(myUrl + "/api/projects/updateproject", {
          rows: rows,
          cols: columns,
          userid: user._id,
          projectid: project._id,
          solde: sold
        });
        if (rs) {
          toast("Enregistrement reussie", { theme: "dark" });
        }
      } else {
        toast.warn("pas de permission", { theme: "dark" });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="row">
      <div className="specialrow">
        <div
          className="d-flex justify-content-around"
          style={{ flexWrap: "wrap" }}
        >
          <div>
            <label style={{ fontStyle: "italic" }}>taille de police</label>
            <input
              type="number"
              className="form-control"
              value={fontsize}
              onChange={(e) => setFontsize(e.target.value)}
              style={{ fontWeight: "bold" }}
            />
          </div>
          <button
            onClick={Enregistrer}
            className="btn-hover color-7 m-3"
            style={{ fontWeight: "bold" }}
          >
            ENREGISTRER
          </button>
          <div>
            <label style={{ fontStyle: "italic" }}>Resultat :</label>
            <input className="form-control" value={result} readOnly />
            <br />
          </div>
        </div>
      </div>
      <hr />
      <div
        className="d-flex justify-content-around"
        style={{ flexWrap: "wrap" }}
      >
        <div
          className="d-flex justify-content-around"
          style={{ flexWrap: "wrap" }}
        >
          <label className="  m-2">code: </label>
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            className="form-controls m-1"
            placeholder="mettez votre code ici"
          />
          <button className="btn btn-dark" onClick={CodeRun}>
            Confirmer
          </button>
        </div>
        <div>
          <p>
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              SOLDE
            </span>{" "}
            :{" "}
            <span
              className=""
              style={{
                color: "darkGreen",
                fontWeight: "bold",
                fontSize: "23px",
                letterSpacing: "2px",
              }}
            >
              {sold}
            </span>{" "}
            <b>$</b>
          </p>
        </div>
      </div>
      <div
        className="col-md-12 mx-auto mt-5"
        style={{ scrollBehavior: "smooth", overflowX: "scroll" }}
      >
        <table className="table table-responsive ">
          <thead>
            <tr className="bg-white">
              <th></th>
              {columns.map((column, index) => (
                <th scope="col" key={index * 4653215} className="text-center ">
                  <DropdownButton
                    as={ButtonGroup}
                    id={`dropdown-variants-info`}
                    variant={"info"}
                    title="Actions"
                  >
                    <Dropdown.Item
                      onClick={() => AdditionColumn(index)}
                      eventKey="1"
                    >
                      Addition
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => multiplicationColumn(index)}
                      eventKey="2"
                    >
                      multiplication
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => deleteColumn(index)}
                      eventKey="2"
                    >
                      Supprimer
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
              ))}
              <th></th>
            </tr>
            <tr className="bg-dark text-white">
              <th scope="col" className="bg-dark text-center">
                Sno.
              </th>
              {columns.map((column, index) => (
                <th
                  scope="col"
                  key={index * 455465}
                  className="bg-dark text-center"
                >
                  <input
                    type="text"
                    className="form-control text-center text-white bg-transparent border-0 myyinput"
                    value={column}
                    onChange={(e) => handleColumnChange(e.target.value, index)}
                    style={{ boxShadow: "none" }}
                  />
                </th>
              ))}
              <th scope="col" className="bg-dark text-center">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => addColumn()}
                  type="button"
                >
                  Ajouter Colonne
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length < 1 ? (
              <tr>
                <th
                  scope="row"
                  colSpan={columns.length + 2}
                  className="text-center py-3"
                >
                  {/* SVP Cliquez sur le bouton Ajouter Ligne   */}
                </th>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index * 4532134586532}>
                  <td className="text-center">{index + 1}</td>
                  {row.map((rowColumn, rowColumnIndex) => {
                    // console.log("row column: " + rowColumn + " D D " + "columnindex " + rowColumnIndex)
                    if (
                      columns[rowColumnIndex].toLowerCase().includes("date")
                    ) {
                      return (
                        <td
                          key={rowColumnIndex / 56465}
                          className="text-center"
                        >
                          <input
                            type="date"
                            value={rowColumn}
                            onChange={(e) =>
                              handleRowChange(
                                e.target.value,
                                index,
                                rowColumnIndex
                              )
                            }
                            className="form-control text-center myyinput"
                            placeholder="tappez"
                            style={{ fontSize: `${fontsize}px` }}
                          />
                        </td>
                      );
                    } else if (
                      columns[rowColumnIndex].toLowerCase().includes("solde")||
                      columns[rowColumnIndex].toLowerCase().includes("sold") ||
                      columns[rowColumnIndex].toLowerCase().includes("reste")
                      
                    ) {
                      let valeur = rowColumn;
                      if (rowColumnIndex > 1) {
                        if (index > 0) {
                          valeur =
                            parseFloat(rows[index - 1][rowColumnIndex]) +
                            parseFloat(row[rowColumnIndex - 2]) -
                            parseFloat(row[rowColumnIndex - 1]);
                        } else {
                          valeur =
                            parseFloat(row[rowColumnIndex - 2]) -
                            parseFloat(row[rowColumnIndex - 1]);
                        }
                      }

                      // console.log(rows)

                      // handleRowChange(valeur1, index, rowColumnIndex)

                      return (
                        <td
                          key={rowColumnIndex / 56465}
                          className="text-center"
                        >
                          <div className="d-flex justify-content-between">
                          <input
                            type="number"
                            value={valeur}
                            onClick={(e) => {
                              handleRowChange(valeur, index, rowColumnIndex);
                              setSold(valeur);
                            }}
                            className="form-control text-center myyinput"
                            placeholder="nombre"
                            style={{
                              fontSize: `${fontsize}px`,
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            readOnly
                          />
                          <p><strong>FC</strong></p>
                          </div>
                        </td>
                      );
                    } else if (
                      columns[rowColumnIndex].toLowerCase().includes("montant") ||
                      columns[rowColumnIndex].toLowerCase().includes("entre") || 
                      columns[rowColumnIndex].toLowerCase().includes("sorti") 
                    ) {
                      let valeur = parseFloat(rowColumn);

                      return (
                        <td
                          key={rowColumnIndex / 56465}
                          className="text-center"
                        >
                          <div className="d-flex justify-content-between">
                          <input
                            type="number"
                            value={valeur}
                            onChange={(e) =>
                              handleRowChange(
                                e.target.value,
                                index,
                                rowColumnIndex
                              )
                            }
                            className="form-control text-center myyinput"
                            placeholder="nombre"
                            style={{ fontSize: `${fontsize}px` }}
                          />
                          <p><strong className="m-1">FC</strong></p>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={rowColumnIndex / 56465}
                          className="text-center"
                        >
                          <textarea
                            type="text"
                            value={rowColumn}
                            onChange={(e) =>
                              handleRowChange(
                                e.target.value,
                                index,
                                rowColumnIndex
                              )
                            }
                            className="form-control text-center myyinput"
                            placeholder="tappez"
                            style={{ fontSize: `${fontsize}px` }}
                          />
                        </td>
                      );
                    }
                  })}
                  <td className="text-center">
                    <DropdownButton
                      as={ButtonGroup}
                      id={`dropdown-variants-info`}
                      variant={"info"}
                      title="Actions"
                    >
                      <Dropdown.Item
                        onClick={() => AdditionRow(index)}
                        eventKey="1"
                      >
                        Addition
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => multiplicationRow(index)}
                        eventKey="2"
                      >
                        multiplication
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => deleteRow(index)}
                        eventKey="2"
                      >
                        Supprimer
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={() => addRow()}
          className="form-control btn btn-outline-dark btn-block mt-2"
          style={{ width: "80vw" }}
        >
          Ajouter Ligne
        </button>
      </div>
    </div>
  );
};

export default Table;
