import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  users: [],
  loading: false,
  error: null,
  searchData: ""
}


// read action
export const showUser = createAsyncThunk('showUser', async ({ rejectWithValue }) => {
  const response = await fetch("https://677c0afb20824100c07baa9a.mockapi.io/crud")
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
})


// create action
export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue, dispatch }) => {  // createUser is the name using which I will call
  const response = await fetch("https://677c0afb20824100c07baa9a.mockapi.io/crud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

// delete action
export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
  const response = await fetch(`https://677c0afb20824100c07baa9a.mockapi.io/crud/${id}`, {
    method: "DELETE"
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
})


// update action
export const updateUser = createAsyncThunk('updateUser', async (data, {rejectWithValue}) => {
  // console.log("This is updateuser",data);
  const response = await fetch(`https://677c0afb20824100c07baa9a.mockapi.io/crud/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.response);
  }

})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers:{
    // navbar search operation
    searchDataFromNav:(state, action)=>{
      console.log("This is reducer",action.payload);
      state.searchData = action.payload;
    }
  },

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
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users = action.payload;
        console.log(action.payload);
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // this is for update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        // way-1
        const updateUserData = action.payload;
        
        const index = state.users.findIndex((ele)=> ele.id === updateUserData.id);

        if(index!==-1){
          state.users[index] = updateUserData;
        }

        //way-2
        // state.users = state.users.map((ele)=>(ele.id === action.payload.id ? action.payload : ele))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

})


export const {searchDataFromNav} = counterSlice.actions
export default counterSlice.reducer