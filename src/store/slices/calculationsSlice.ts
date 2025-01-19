import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {E_CalculationStatus, T_Calculation, T_CalculationsFilters, T_Resistor} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_CalculationsSlice = {
    draft_calculation_id: number | null,
    resistors_count: number | null,
    calculation: T_Calculation | null,
    calculations: T_Calculation[],
    filters: T_CalculationsFilters,
    save_mm: boolean
}

const initialState:T_CalculationsSlice = {
    draft_calculation_id: null,
    resistors_count: null,
    calculation: null,
    calculations: [],
    filters: {
        status: E_CalculationStatus.NotSpecified,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchCalculation = createAsyncThunk<T_Calculation, string, AsyncThunkConfig>(
    "calculations/calculation",
    async function(calculation_id) {
        const response = await api.calculations.calculationsRead(calculation_id) as AxiosResponse<T_Calculation>
        return response.data
    }
)

export const fetchCalculations = createAsyncThunk<T_Calculation[], object, AsyncThunkConfig>(
    "calculations/calculations",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.calculations.calculationsList({
            status: state.calculations.filters.status,
            date_formation_start: state.calculations.filters.date_formation_start,
            date_formation_end: state.calculations.filters.date_formation_end
        }) as AxiosResponse<T_Calculation[]>

        return response.data.filter(calculation => calculation.owner.includes(state.calculations.filters.owner))
    }
)

export const removeResistorFromDraftCalculation = createAsyncThunk<T_Resistor[], string, AsyncThunkConfig>(
    "calculations/remove_resistor",
    async function(resistor_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.calculations.calculationsDeleteResistorDelete(state.calculations.calculation.id, resistor_id) as AxiosResponse<T_Resistor[]>
        return response.data
    }
)

export const deleteDraftCalculation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/delete_draft_calculation",
    async function(_, {getState}) {
        const state = getState()
        await api.calculations.calculationsDeleteDelete(state.calculations.calculation.id)
    }
)

export const sendDraftCalculation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/send_draft_calculation",
    async function(_, {getState}) {
        const state = getState()
        await api.calculations.calculationsUpdateStatusUserUpdate(state.calculations.calculation.id)
    }
)

export const updateCalculation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/update_calculation",
    async function(data, {getState}) {
        const state = getState()
        await api.calculations.calculationsUpdateUpdate(state.calculations.calculation.id, {
            ...data
        })
    }
)

export const updateResistorValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/update_mm_value",
    async function({resistor_id, count},thunkAPI) {
        const state = thunkAPI.getState()
        await api.calculations.calculationsUpdateResistorUpdate(state.calculations.calculation.id, resistor_id, {count})
    }
)

export const acceptCalculation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "calculations/accept_calculation",
    async function(calculation_id,{dispatch}) {
        await api.calculations.calculationsUpdateStatusAdminUpdate(calculation_id, {status: E_CalculationStatus.Completed})
        await dispatch(fetchCalculations)
    }
)

export const rejectCalculation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "calculations/accept_calculation",
    async function(calculation_id,{dispatch}) {
        await api.calculations.calculationsUpdateStatusAdminUpdate(calculation_id, {status: E_CalculationStatus.Rejected})
        await dispatch(fetchCalculations)
    }
)

const calculationsSlice = createSlice({
    name: 'calculations',
    initialState: initialState,
    reducers: {
        saveCalculation: (state, action) => {
            state.draft_calculation_id = action.payload.draft_calculation_id
            state.resistors_count = action.payload.resistors_count
        },
        removeCalculation: (state) => {
            state.calculation = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCalculation.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Calculation>) => {
            state.calculation = action.payload
        });
        builder.addCase(fetchCalculations.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Calculation[]>) => {
            state.calculations = action.payload
        });
        builder.addCase(removeResistorFromDraftCalculation.rejected, (state:T_CalculationsSlice) => {
            state.calculation = null
        });
        builder.addCase(removeResistorFromDraftCalculation.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Resistor[]>) => {
            if (state.calculation) {
                state.calculation.resistors = action.payload as T_Resistor[]
            }
        });
        builder.addCase(sendDraftCalculation.fulfilled, (state:T_CalculationsSlice) => {
            state.calculation = null
        });
    }
})

export const { saveCalculation, removeCalculation, triggerUpdateMM, updateFilters } = calculationsSlice.actions;

export default calculationsSlice.reducer