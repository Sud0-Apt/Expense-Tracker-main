import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './css/VisualDashboard.css';
import { useTxnContext } from '../hooks/useTxn';
import { useAuthContext } from '../hooks/useAuth';
import NavbarPage from './navbarpage';

const VisualDashboard = () => {
  const {transactions,dispatch}=useTxnContext()
  const {user}=useAuthContext()
  const {token}=useAuthContext()
  const [groupedTransactions, setGroupedTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:5000/api/txn/',{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
          dispatch({type:'SET_TXNS', payload:json})
      }
      // Group transactions by date
      const groupedByDate = json.reduce((acc, txn) => {
        const date = txn.TxnDate.split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, amount: 0 };
        }
        acc[date].amount += txn.Amount;
        return acc;
      }, {});

      // Convert grouped transactions to array
      const groupedArray = Object.values(groupedByDate);
      setGroupedTransactions(groupedArray);

      // Group transactions by category
      const groupedByCategory = json.reduce((acc, txn) => {
        if (!acc[txn.type]) {
          acc[txn.type] = { category: txn.type, amount: 0 };
        }
        acc[txn.type].amount += txn.Amount;
        return acc;
      }, {});

      // Convert grouped categories to array
      const categoryArray = Object.values(groupedByCategory);
      setCategoryData(categoryArray);
  }
  if (user) {
      fetchTransactions();
  }
  }, []);

  if (!user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  if (transactions.length === 0) {
    return <p>Loading transactions...</p>;
  }
  // Hardcoded transactions data
  /*const data = [
    { date: '2024-01-01', description: 'Groceries', amount: 50, category: 'Food' },
    { date: '2024-01-02', description: 'Electricity Bill', amount: 75, category: 'Utilities' },
    { date: '2024-01-03', description: 'Internet Bill', amount: 45, category: 'Utilities' },
    { date: '2024-01-04', description: 'Dining Out', amount: 30, category: 'Food' },
    { date: '2024-01-05', description: 'New Shoes', amount: 100, category: 'Shopping' },
  ];*/

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9400d3'];

  return (
    <div className="dashboard">
      <NavbarPage title="Dashboard"/>
      <div className="chart-container">
        <div className="chart">
          <h3>Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedTransactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#9400d3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groupedTransactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#9400d3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Area Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={groupedTransactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amount" stroke="#9400d3" fill="#9400d3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VisualDashboard;
