import axios from "axios";
import React from "react"

const useAxios = (baseUrl) => {
   
const[medicines,setMedicines]= React.useState([]);

React.useEffect(()=>{
    axios.get(baseUrl).then((response)=>{
        console.log(response.data);
        setMedicines(response.data);
    }).catch((err)=>{
        console.log(err);
    })
},[])
return {medicines};
}

export default useAxios;