import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import resistorsReducer from "./slices/resistorsSlice.ts"

export const store = configureStore({
    reducer: {
        resistors: resistorsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;