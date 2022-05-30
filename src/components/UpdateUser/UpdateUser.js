import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const UpdateUser = () => {
  const [updatedUser, setUpdatedUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:8000/users/update/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUpdatedUser(data));
  }, [id]);

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    const updatedName = e.target.value;
    const updatedUserDetails = { name: updatedName, email: updatedUser.email };
    setUpdatedUser(updatedUserDetails);
  };

  const handleEmailChange = (e) => {
    const updateEmail = e.target.value;
    const updatedEmailDetails = { name: updatedUser.name, email: updateEmail };
    setUpdatedUser(updatedEmailDetails);
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Updated Successfully");
          setUpdatedUser({});
        }
      });
  };

  return (
    <div>
      <h2>Updating user: {updatedUser.name}</h2>
      <h3>User id:{updatedUser._id} </h3>
      <h2>Email: {updatedUser.email}</h2>
      <form onSubmit={handleUpdateForm} className="form">
        <p>
          Name:{" "}
          <input
            type="text"
            onChange={handleNameChange}
            value={updatedUser.name || ""}
          />
        </p>
        <p>
          Email:{" "}
          <input
            type="email"
            onChange={handleEmailChange}
            value={updatedUser.email || ""}
          />
        </p>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
