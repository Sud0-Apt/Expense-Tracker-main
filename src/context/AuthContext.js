// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token,setToken]=useState(null)
  const login = (userData,tokendata) => {
    setUser(userData);
    setToken(tokendata)
  };

  useEffect(() => {
    fetch('/api/users/profile')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);
  // const logout = async () => {
  //   try {
  //     await axios.post('/api/logout');
  //     setUser(null);
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  // const updateUser = async (updates) => {
  //   try {
  //     const { data } = await axios.put('/api/update', updates);
  //     setUser(data);
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //   }
  // };

  /*useEffect(() => {
    // Check if the user is already logged in
    axios.get('http://localhost:5000/api/auth/protected', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setUser(true);
        } else {
          setUser(false);
        }
      })
      .catch(() => setUser(false));
  }, []);*/

  return (
    <AuthContext.Provider value={{ user,setUser,token,login, }}>
      {children}
    </AuthContext.Provider>
  );
};








