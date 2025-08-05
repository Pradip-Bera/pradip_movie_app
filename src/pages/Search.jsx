import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import Card from '../components/Card';
import axios from 'axios';

const Search = () => {
  const location = useLocation();
  const [data,setdata] =useState([]);
  const [page,setpage] = useState(1);
  const navigate = useNavigate();
  const query = location?.search?.slice(3);


  const fetchdata = async()=>{
  try {
    const response = await axios.get(`search/multi`,{
      params : {
        query: query,
        page: page
  
      }
    })
    setdata((preve)=>{
      return [
        ...preve,
        ...response.data.results
      ]
    })
  } catch (error) {
    console.log("error",error)
  }
 }

   useEffect(()=>{
    if(query){
      setpage(1)
      setdata([])
      fetchdata()
    }
  },[location?.search])

 const handleScroll = ()=>{
   if((window.innerHeight+window.screenY)>=document.body.offsetHeight){
     setpage(preve=>preve+1);
   }
  }
  useEffect(()=>{
    if(query)
    {
      fetchdata();
    } 
   },[page]);

  useEffect(()=>{
       window.addEventListener('scroll',handleScroll)
     },[])

  return (
    <div className='py-16'>

        {/* <div className='lg:hidden my-2 mx-1 mr-3 sticky top-[70px] z-30'>
            <input 
              type='text'
              placeholder='Search here...'
              onChange={(e)=> navigate(`/search?q=${e.target.value}`)}
              value={query?.split("%20")?.join(" ")}
              className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 '
            />
        </div> */}
        <div className='container mx-auto'>
          <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

          <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
              {
                data.map((searchData,index)=>{
                  return(
                    <Card data={searchData} key={searchData.id+"search"+index} media_type={searchData.media_type}/>
                  )
                })
              }
          </div>

        </div>
    </div>
  )
}

export default Search;
