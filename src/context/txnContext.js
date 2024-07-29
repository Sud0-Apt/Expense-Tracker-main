import { createContext, useReducer } from 'react'

export const TxnContext = createContext()

export const txnReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TXNS':
            return {
                transactions: action.payload
            }
        case 'CREATE_TXN':
            return {
                transactions: [action.payload, ...state.transactions]
            }
        default:
            return state
    }
}

export const TxnsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer (txnReducer, {
        transactions: []
    })
    return (
        <TxnContext.Provider value={{...state,dispatch}}>
        { children }
        </TxnContext.Provider>
    )
}