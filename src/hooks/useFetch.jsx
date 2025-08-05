import axios from "axios";
import { useEffect,useState } from "react";

const useFetch = (endpoint)=>{
      const [data,setdata]=useState([]);
      const [loading,setloading]=useState([]);
      const fetchdata = async()=>{
          try{
            setloading(true);
            const response = await axios.get(endpoint)
            setloading(false);
            setdata(response.data.results)
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

export default useFetch;