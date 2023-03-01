import {createSlice} from "@reduxjs/toolkit";
import {addBlog, addSong, editBlog, findByIdBlog, getBlogs, getSongs, removeBlog} from "../../services/songService";

const initialState = {
    songs: [],
    song: {}
}
const songSlice = createSlice({
    name: 'songs',
    loading: true,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSongs.fulfilled,(state,action)=>{
            state.songs = action.payload
            state.loading = false
        });
        // builder.addCase(findByIdBlog.fulfilled,(state,action)=>{
        //     state.songs = action.payload
        // });
        builder.addCase(addSong.fulfilled,(state,action)=>{
            state.songs.push(action.payload)

        });
        // builder.addCase(removeBlog.fulfilled,(state,action)=>{
        //     state.blogs.splice(action.payload)
        //
        // });
        // builder.addCase(editBlog.fulfilled,(state,action)=>{
        //     state.blogs = action.payload
        // });
    }

})
export default songSlice.reducer;