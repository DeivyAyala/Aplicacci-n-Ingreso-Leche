import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modal: true
    },
    reducers: {
        onOpenModal: ( state ) => {
            state.modal = true
        },
        onCloseModal: ( state ) => {
            state.modal = false
        }
        
    }
})


export const {onOpenModal, onCloseModal} = uiSlice.actions