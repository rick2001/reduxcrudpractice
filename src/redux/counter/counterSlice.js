import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
const initialState = {
  users:[],
  loading:false,
  error:null
}

// create action
export const createUser = createAsyncThunk('createUser', async (data, {rejectWithValue, dispatch})=>{  // createUser is the name using which I will call
    const response = await fetch("https://677c0afb20824100c07baa9a.mockapi.io/crud",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        dispatch(showUser());
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }


})

// read action
export const showUser = createAsyncThunk('showUser',async ({rejectWithValue})=>{
    const response = await fetch("https://677c0afb20824100c07baa9a.mockapi.io/crud")
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,

  extraReducers: (builder) => {
    // this is for add user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // this is for show user
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false; 
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

})



export default counterSlice.reducer