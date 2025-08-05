import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bannerdata:[],
  imgUrl : "",
}

export const movieScilce = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setBannerData: (state,action) => {
        state.bannerdata = action.payload;
    },
    setImgUrl : (state,action)=>{
      state.imgUrl = action.payload;
    }
  }
})

export const { setBannerData,setImgUrl } = movieScilce.actions

export default movieScilce.reducer; 