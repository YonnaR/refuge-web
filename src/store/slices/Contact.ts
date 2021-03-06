import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { IContactRequest } from '@/core/ContactRequest/types/IContactRequest';

import { createToast } from './Layout';

export type ContactState = {
    request: IContactRequest,
    isRequestSending: boolean;
}
export interface MutateContactPayload {
    name: keyof IContactRequest,
    value: any
}

const initialState: ContactState = {
  request: {
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  },
  isRequestSending: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactRequest(): ContactState {
      return initialState;
    },
    mutateContactRequest(state, { payload }: PayloadAction<MutateContactPayload>): ContactState {
      return {
        ...state,
        request: {
          ...state.request,
          [payload.name]: payload.value,
        },
      };
    },
    mutateContactRequestSendingState(
      state,
      { payload }: PayloadAction<boolean>,
    ): ContactState {
      return {
        ...state,
        isRequestSending: payload,
      };
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-use-before-define
    builder.addCase(sendContactRequest.fulfilled, (state) => state);
  },
});

export const {
  mutateContactRequest,
  mutateContactRequestSendingState,
  resetContactRequest,
} = contactSlice.actions;

export const sendContactRequest = createAsyncThunk(
  'sendContactRequest',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, getState }) => {
    try {
      dispatch(mutateContactRequestSendingState(true));
      const { request } = (getState() as any).contact;
      const response = await axios.post('/api/contact', request);
      dispatch(createToast({
        message: 'Demande envoyer avec succès',
        type: 'success',
      }));

      dispatch(mutateContactRequestSendingState(false));
      dispatch(resetContactRequest());

      return response.data;
    } catch (e) {
      dispatch(createToast({
        message: (e as AxiosError).response?.data as string,
        type: 'error',
      }));
      dispatch(mutateContactRequestSendingState(false));
    }
  },
);

export default contactSlice.reducer;
