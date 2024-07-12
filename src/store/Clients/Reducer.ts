import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import clientsData from "./Clients.json";

interface Client {
  title: string;
  description: string;
  clients: string[];
}

interface ClientsState {
  clients: Client;
}

const initialState: ClientsState = {
  clients: {
    title: "",
    description: "",
    clients: []
  }
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client>) {
      state.clients = action.payload;
    },
  },
});

export const { setClients } = clientsSlice.actions;

export const loadClients = () => (dispatch: any) => {
  dispatch(setClients(clientsData));
};

export default clientsSlice.reducer;
