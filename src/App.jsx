import { Outlet } from "react-router";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Mobilenavigation from "./components/Movilenavigation.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData,setImgUrl} from "./store/movieScilce.js";
function App() {

  const dispatch = useDispatch();

  const fetchTrending = async()=>{
    try{
        const response = await axios.get(`/trending/all/week`);
        dispatch(setBannerData(response.data.results));
    }
    catch(error)
    {
      console.log(error);
    }
  }


  const fetchConfigure = async()=>{
    try{
        const response = await axios.get(`/configuration`);
        dispatch(setImgUrl(response.data.images.secure_base_url+"original"));
    }
    catch(error)
    {
      console.log(error);
    }
  }

  useEffect(()=>{

    fetchTrending();
    fetchConfigure();
  },[]);

  return <>
<main className='pt-16 pb-14 lg:pb-0'>
        <Header/>
        <div className='min-h-[90vh]'>
            <Outlet/>
        </div>
        <Footer/>
        <Mobilenavigation/>
    </main>
  </>
}

export default App
