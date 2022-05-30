import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  const handleDelete = (id) => {
    // const url =;
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainingUser = allUsers.filter((pd) => pd._id !== id);
            setAllUsers(remainingUser);
          }
        });
    }
  };

  // const handleUpdate = (id) => {
  //   console.log(id);
  // };

  return (
    <div>
      <h3>Total Users: {allUsers.length}</h3>
      {allUsers.map((pd) => (
        <li key={pd._id}>
          Username::{pd.name}:::email:{pd.email}
          <Link to={`/users/update/${pd._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(pd._id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default Users;
