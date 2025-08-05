import React from 'react'
import { IoClose } from "react-icons/io5";
import useFetchdetails from '../hooks/usefetchdetails';
const Videoplay = ({data,close,media_type}) => {
  const {data:videData} = useFetchdetails(`/${media_type}/${data?.id}/videos`);
     return (
    <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'> 
        <div className='bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative'>
          
          <button onClick={close} className=' absolute -right-5 -top-5 text-2xl z-50 text-center'>
              <IoClose/>
          </button>

          <iframe
            src={`https://www.youtube.com/embed/${videData?.results[0]?.key}`}
            className='w-full h-full'
          />
        </div>
    </section>
  )
}

export default Videoplay
