import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Resistor, T_ResistorAddData, T_ResistorsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveCalculation} from "store/slices/calculationsSlice.ts";
import {Resistor} from "src/api/Api.ts";

type T_ResistorsSlice = {
    resistor_name: string
    resistor: null | T_Resistor
    resistors: T_Resistor[]
}

const initialState:T_ResistorsSlice = {
    resistor_name: "",
    resistor: null,
    resistors: []
}

export const fetchResistor = createAsyncThunk<T_Resistor, string, AsyncThunkConfig>(
    "fetch_resistor",
    async function(id) {
        const response = await api.resistors.resistorsRead(id) as AxiosResponse<T_Resistor>
        return response.data
    }
)

export const fetchResistors = createAsyncThunk<T_Resistor[], object, AsyncThunkConfig>(
    "fetch_resistors",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.resistors.resistorsList({
            resistor_name: state.resistors.resistor_name
        }) as AxiosResponse<T_ResistorsListResponse>

        thunkAPI.dispatch(saveCalculation({
            draft_calculation_id: response.data.draft_calculation_id,
            resistors_count: response.data.resistors_count
        }))

        return response.data.resistors
    }
)

export const addResistorToCalculation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "resistors/add_resistor_to_calculation",
    async function(resistor_id) {
        await api.resistors.resistorsAddToCalculationCreate(resistor_id)
    }
)

export const deleteResistor = createAsyncThunk<T_Resistor[], string, AsyncThunkConfig>(
    "delete_resistor",
    async function(resistor_id) {
        const response = await api.resistors.resistorsDeleteDelete(resistor_id) as AxiosResponse<T_Resistor[]>
        return response.data
    }
)

export const updateResistor = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_resistor",
    async function({resistor_id, data}) {
        await api.resistors.resistorsUpdateUpdate(resistor_id as string, data as Resistor)
    }
)

export const updateResistorImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_resistor_image",
    async function({resistor_id, data}) {
        await api.resistors.resistorsUpdateImageCreate(resistor_id as string, data as {image?: File})
    }
)

export const createResistor = createAsyncThunk<void, T_ResistorAddData, AsyncThunkConfig>(
    "update_resistor",
    async function(data) {
        await api.resistors.resistorsCreateCreate(data)
    }
)

const resistorsSlice = createSlice({
    name: 'resistors',
    initialState: initialState,
    reducers: {
        updateResistorName: (state, action) => {
            state.resistor_name = action.payload
        },
        removeSelectedResistor: (state) => {
            state.resistor = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchResistors.fulfilled, (state:T_ResistorsSlice, action: PayloadAction<T_Resistor[]>) => {
            state.resistors = action.payload
        });
        builder.addCase(fetchResistor.fulfilled, (state:T_ResistorsSlice, action: PayloadAction<T_Resistor>) => {
            state.resistor = action.payload
        });
        builder.addCase(deleteResistor.fulfilled, (state:T_ResistorsSlice, action: PayloadAction<T_Resistor[]>) => {
            state.resistors = action.payload
        });
    }
})

export const { updateResistorName, removeSelectedResistor} = resistorsSlice.actions;

export default resistorsSlice.reducer