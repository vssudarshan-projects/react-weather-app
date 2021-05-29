import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialMaterialTableState = { tableRef: null};

const materialTableSlice = createSlice({
  name: "materialTable",
  initialState: initialMaterialTableState,
  reducers: {
    setTableRef(state, action) {
      state.tableRef = action.payload.tableRef;
    },
  },
});

const store = configureStore({
  reducer: materialTableSlice.reducer,
});

export const materialTableActions = materialTableSlice.actions;
export default store;
