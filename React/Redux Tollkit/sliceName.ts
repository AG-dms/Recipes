import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiLogin, apiUserLogout, apiUserRegistration } from '@api/loginAPI';
import { store } from '@store';
import { LoginInitialStateType, loginType, RefreshedTokens, ServerError, UserType } from './types';

const initialState: typeInitialState = {
  
}

export const actionAsync = createAsyncThunk<responseType, requestType>(
  'slice/actionType',
  async () => {
    try {
      
    } catch (error) {
     
    } finally {

    }
  },
);

const nameSlice = createSlice({
  name: 'nameSlice',
  initialState,
  reducers: {

  },

  extraReducers: builder => {

  },
});

export const { actions } = nameSlice.actions;

export default nameSlice.reducer;
