import { createContext, useState, useContext, useEffect } from "react";
import { getSeccionRequest, getItemsRequest } from "../../api/auth/moduls.js";
//creacion del contexto
export const ModulsContext = createContext();
//funcion para usar el context
export const UseModuls = () => {
  const context = useContext(ModulsContext);
  //validar existencias del context
  if (!context) {
    throw new Error("UseModuls must be used within an ModulsProvider");
  }
  return context;
};
//creando el provider (elemento englobador)
export const ModulsProvider = ({ children }) => {
  const [seccions, setSeccions] = useState([]);
  const [options, setOptions] = useState([]);
  const [erros, setErrors] = useState([]);
  //funciones (OPERACIONES)
  const getSeccions = async () => {
    try {
      const res = await getSeccionRequest();
      setSeccions(res.data);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  };

  const getOptions = async () => {
    try {
      const res = await getItemsRequest();
      setOptions(res.data)
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  }

  return (
    <ModulsContext.Provider value={{ seccions, getSeccions, options, getOptions }}>
      {children}
    </ModulsContext.Provider>
  );
};
