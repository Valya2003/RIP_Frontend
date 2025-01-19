import {createSlice} from "@reduxjs/toolkit";

type T_ResistorsSlice = {
    resistor_name: string
}

const initialState:T_ResistorsSlice = {
    resistor_name: "",
}


const resistorsSlice = createSlice({
    name: 'resistors',
    initialState: initialState,
    reducers: {
        updateResistorName: (state, action) => {
            state.resistor_name = action.payload
        }
    }
})

export const { updateResistorName} = resistorsSlice.actions;

export default resistorsSlice.reducer