import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
       
        const response = await fetch("http://localhost:4000/user", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data.data || []);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading users...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
<>
   <AdminNavbar/>

    <div className="view-user-container" style={{ padding: "20px" }}>
   
      <h2>User List</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #000" }}>
            <th style={{ padding: "8px", textAlign: "center" }}>S.N</th>
            <th style={{ padding: "8px", textAlign: "center" }}>Name</th>
            <th style={{ padding: "8px", textAlign: "center" }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.s_n} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px", textAlign: "center" }}>{user.s_n}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{user.name}</td>
              <td style={{ padding: "8px", textAlign: "center" }}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ViewUser;
