import axios from "axios";
import React from "react"
const baseUrl = "http://localhost:8000/pharmacist/medicines";

const useAxios = () => {
   
const[medicines,setMedicines]= React.useState([]);

React.useEffect(()=>{
    axios.get(baseUrl).then((response)=>{
        console.log(response.data);
        setMedicines(response.data);
    }).catch((err)=>{
        console.log(err);
    })
},[])
return medicines;
}

export default useAxios;



