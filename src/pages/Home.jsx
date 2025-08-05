import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScollCard from '../components/HorizontalScollCard';
import useFetch from '../hooks/useFetch';


const Home = () => {
   const trendingdata = useSelector(state => state.movieData.bannerdata);
   const {data:nowPlayingData} = useFetch('/movie/now_playing');
    const {data:topRatedData} = useFetch('/movie/top_rated');
    const {data:popularTvShowData} = useFetch('/tv/popular');
    const {data:onTheairShowData} = useFetch('/tv/on_the_air');
  return (
    <div>
      <BannerHome/>
      <HorizontalScollCard data={trendingdata} heading={"Trending"} trending={true}/>
      <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
       <HorizontalScollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
        <HorizontalScollCard data={popularTvShowData} heading={"Poular TV Show"} media_type={"tv"}/>
         <HorizontalScollCard data={onTheairShowData} heading={"On The Air"} media_type={"tv"}/>
    </div>
  )
}

export default Home
