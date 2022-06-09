import React from "react";

export const setFunnelType = (payload) => ({
    type: "SET_FUNNEL_TYPE",
    payload: payload
});

export const setCurrentPane = (payload) => ({
    type: "SET_CURRENT_PANE",
    payload: payload
});

export const setCurrentOutlet = (payload) => ({
    type: "SET_CURRENT_OUTLET",
    payload: payload
})

export const addToForm = (payload) => ({
    type: "ADD_TO_FORM",
    payload: payload
})

export const NewAdminFunnelReducer = (state, action) => {
    if (action !== undefined) {
        let formRef;
        switch (action.type) {
            case "SELECT_FUNNEL_TYPE":
                return { 
                    ...state, 
                    selectedFunnelType: action.payload
                };
            case "SET_FUNNEL_TYPE":
                return { 
                    ...state, 
                    form: {
                        ...state.form,
                        funnelType: action.payload
                    }
            };
            case "SET_CURRENT_PANE":
                return {
                    ...state,
                    currentPane: action.payload
                }
            case "SET_CURRENT_OUTLET":
                return {
                    ...state,
                    currentOutlet: action.payload
                }
            case "ADD_TO_FORM":
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [action.payload.name]: action.payload.value
                    }
                }
        };
    }
};