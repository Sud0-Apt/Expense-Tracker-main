import { AuthContext } from "../context/AuthContext"
import { useContext } from 'react'
export const useAuthContext = () => {
    const context = useContext (AuthContext)
    if (!context) {
        throw Error('useTxnContext must be used inside an TxnContextProvider')
    }
    return context
}