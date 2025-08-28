import React from "react";
import data from "../data/usersData";

export default function UsersList() {
  
  return (
    <div>
      <h2 >User List</h2>
      {data.map((user) => (
        <div key={user.key} style={{ marginBottom: "1rem", padding: "10px", border: "1px solid #ccc" }}>
          <h3>{user.data.name}</h3>
          <p className='font-medium text-gray-500 hover:text-red-500'  >Age: {user.data.age}</p>
          <p>Email: {user.data.email}</p>
          <p>City: {user.data.city}</p>
        </div>
      ))}
    </div>
  );
}
