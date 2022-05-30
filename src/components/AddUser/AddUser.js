import React from "react";
import "./AddUser.css";
import { useRef } from "react";
import { useState } from "react";

const AddUser = () => {
  //   const [user, setUser] = useState({});
  const nameRef = useRef();
  const emailRef = useRef();

  //   const productRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    // const product = productRef.current.value;
    const userDetails = { name, email };

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
  };

  return (
    <form onSubmit={handleForm} className="form">
      <p>
        Name: <input ref={nameRef} type="text" required />
      </p>
      <p>
        Email: <input ref={emailRef} type="email" required />{" "}
      </p>
      {/* <p>
        Brand: <input ref={productRef} required type="text" />{" "}
      </p> */}
      <br />
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  );
};

export default AddUser;
