import axios from "axios";
import { useEffect,useState } from "react";

const useFetchdetails = (endpoint)=>{
      const [data,setdata]=useState();
      const [loading,setloading]=useState([]);
      const fetchdata = async()=>{
          try{
            setloading(true);
            const response = await axios.get(endpoint)
            setloading(false);
            setdata(response.data)
          }
          catch(error){
              console.log('error',error)
          }
      }

      useEffect(()=>{
        fetchdata();

      },[endpoint])
      return {data,loading}
}

export default useFetchdetails;