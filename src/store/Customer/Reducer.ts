import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CustomersData from "./Customer.json";

interface btnItem {
  title: string;
  link: string;
}

interface CustomerItem {
  description: string;
  logo: string;
  images: string[];
  name: string;
  association: string;
  btn: btnItem;
}

interface Customer {
  Customer: CustomerItem[];
}

interface CustomerState {
  Customers: Customer | null;
}

const initialState: CustomerState = {
  Customers: null,
};

const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<Customer>) {
      state.Customers = action.payload;
    },
  },
});

export const { setCustomers } = CustomerSlice.actions;

export const loadCustomers = () => (dispatch: any) => {
  dispatch(setCustomers(CustomersData));
};

export default CustomerSlice.reducer;