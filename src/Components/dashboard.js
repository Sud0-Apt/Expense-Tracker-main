import React, { useState } from 'react';
import './css/dashboard.css';
import { useTxnContext } from '../hooks/useTxn';
import { useAuthContext } from '../hooks/useAuth';
import NavbarPage from './navbarpage';

function Dashboard() {
  const {dispatch}=useTxnContext()
  const {user}=useAuthContext()
  const {token}=useAuthContext()
  const [type,setType]=useState('')
  const [Amount, setAmt]=useState('')
  const [TxnDate, setDate]=useState('')
  const [error,setError]=useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid=user._id
    const txn = {type,Amount,TxnDate,userid}
    console.log(txn)
    const response = await fetch('http://localhost:5000/api/txn', {
      method: 'POST',
      body: JSON.stringify(txn),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
    const json = await response.json()
    if(!response.ok){
      setError(json.error)
    }
    if(response.ok){
      setType('')
      setAmt('')
      setDate('')
      setError(null)
      dispatch({type:'CREATE_TXN',payload:json})
      console.log(txn);
    }
    
  };

  return (
    <div className="dashboard">
      <NavbarPage title="Expense Entry" />
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={TxnDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={Amount}
            onChange={(e) => setAmt(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn">Add Expense</button>
        {error && <div className="error">{error} </div>}
      </form>
    </div>
  );
}

export default Dashboard;
