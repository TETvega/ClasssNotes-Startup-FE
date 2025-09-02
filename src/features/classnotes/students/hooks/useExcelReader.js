import { useState } from "react";
import * as XLSX from "xlsx";

export const useExcelReader = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [emptyFields, setEmptyFields] = useState({
    emptyFirstName: 0,
    emptyLastName: 0,
    emptyEmails: 0,
    totalRows: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const readExcelFile = (file) => {
    setFile(file);
    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        let emptyFirstName = 0;
        let emptyLastName = 0;
        let emptyEmails = 0;
        const totalRows = data.length - 1;

        const processedData = data.slice(1, 1000).map((row) => {
          const firstName = row[0]?.toString().trim() || "";
          const lastName = row[1]?.toString().trim() || "";
          const email = row[2]?.toString().trim() || "";

          if (!firstName) emptyFirstName++;
          if (!lastName) emptyLastName++;
          if (!email) emptyEmails++;

          return {
            firstName: firstName || "Sin nombre",
            lastName: lastName || "Sin apellido",
            email: email || "Sin email",
          };
        });

        setEmptyFields({
          emptyFirstName,
          emptyLastName,
          emptyEmails,
          totalRows,
        });

        setFileData(processedData);
        setIsLoading(false);
      };

      reader.onerror = () => {
        setError("Error al leer el archivo");
        setIsLoading(false);
      };
    } catch (err) {
      setError("Error al procesar el archivo Excel", err);
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setFileData([]);
    setEmptyFields({
      emptyFirstName: 0,
      emptyLastName: 0,
      emptyEmails: 0,
      totalRows: 0,
    });
    setError(null);
    setIsLoading(false);
  };

  return {
    file,
    fileData,
    emptyFields,
    isLoading,
    error,
    readExcelFile,
    setFile,
    reset,
  };
};
