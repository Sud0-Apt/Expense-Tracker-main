import { TxnContext } from '../context/txnContext'
import { useContext } from 'react'
export const useTxnContext = () => {
    const context = useContext (TxnContext)
    if (!context) {
        throw Error('useTxnContext must be used inside an TxnContextProvider')
    }
    return context
}