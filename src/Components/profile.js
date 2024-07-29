// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import './css/profile.css';
// import { FaUserCircle } from 'react-icons/fa'; // Importing an icon for the user

// const Profile = ({ onClose }) => {
//   const { user, logout, updateUser } = useContext(AuthContext);
//   const [username, setUsername] = useState(user.username);
//   const [email, setEmail] = useState(user.email);
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username);
//       setEmail(user.email);
//     }
//   }, [user]);

//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       await updateUser({ username, password });
//       setEditing(false);
//     } catch (error) {
//       console.error("Failed to update user:", error);
//     }
//     setLoading(false);
//   };

//   const handleLogout = () => {
//     logout();
//     onClose(); // Close the profile popup
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <FaUserCircle className="profile-icon" />
//         <h2>Profile</h2>
//         <button className="close-button" onClick={onClose}>X</button>
//       </div>
//       <div className="profile-info">
//         <div className="profile-field">
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             disabled={!editing}
//           />
//         </div>
//         <div className="profile-field">
//           <label>Email:</label>
//           <input type="email" value={email} disabled />
//         </div>
//         {editing && (
//           <div className="profile-field">
//             <label>New Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         )}
//         <div className="profile-buttons">
//           {editing ? (
//             <>
//               <button className="save-button" onClick={handleUpdate} disabled={loading}>
//                 {loading ? 'Saving...' : 'Save'}
//               </button>
//               <button className="cancel-button" onClick={() => setEditing(false)}>
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button className="edit-button" onClick={() => setEditing(true)}>
//               Edit
//             </button>
//           )}
//           <button className="logout-button" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


// Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './css/profile.css';
import { FaUserCircle } from 'react-icons/fa';

const Profile = ({ onClose }) => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateUser({ username, password });
      setEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose(); // Close the profile popup
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaUserCircle className="profile-icon" />
        <h2>Profile</h2>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      <div className="profile-info">
        <div className="profile-field">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!editing}
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input type="email" value={email} disabled />
        </div>
        {editing && (
          <div className="profile-field">
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <div className="profile-buttons">
          {editing ? (
            <>
              <button className="save-button" onClick={handleUpdate} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button className="cancel-button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
