import exportFromJSON from "export-from-json";
import { FaFileDownload } from "react-icons/fa";
import { convertDataToJSON } from "../../../methods";

const SaveToExcel = ({ columns, rows }) => {
  const downloadExcelFile = () => {
    const data = convertDataToJSON({ columns, rows });

    const fileName = "data";
    const exportType = exportFromJSON.types.xls;

    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <button
      type="button"
      onClick={() => downloadExcelFile()}
      className="btn btn-success"
    >
      <FaFileDownload style={{ marginRight: "2px" }} size="15" />Telecharger Fichier Excel
    </button>
  );
};

export default SaveToExcel;
