import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [user, setusers] = useState(null);

  useEffect(() => {
    async function facthdata() {
      try {
        let response = await axios("http://localhost:3000/users");
        console.log(response.data);
        setusers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    facthdata();
  }, []);

  async function deleteuser(id) {
    console.log(id);

    await axios.delete(`http://localhost:3000/user/${id}`);
    let response = await axios("http://localhost:3000/users");
    setusers(response.data);
  }

  async function singleuser(id) {
    console.log(id);
    try {
      let response = await axios.post(`http://localhost:3000/user/${id}`);
      setusers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function edituser(id) {
    try {
      const newusername = prompt("enter new user name");

      if (!newusername) {
        alert("Username cannot be empty.");
        return; // Exit the function if input is empty
      }

      console.log(id);

      await axios.put(`http://localhost:3000/user/${id}`, {
        username: newusername,
      });
      let response = await axios("http://localhost:3000/users");

      setusers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>todo</div>
      {user && user.length >= 0 ? (
        user.map((item, index) => (
          <div key={index}>
            <h1>username:{item.data.username}</h1>
            <h1>id:{item.data.id}</h1>
            <button
              onClick={() => {
                deleteuser(item.data.id);
              }}
            >
              delet
            </button>
            <button
              onClick={() => {
                edituser(item.data.id);
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                singleuser(item.data.id);
              }}
            >
              single user
            </button>
          </div>
        ))
      ) : (
        <h1>loading..</h1>
      )}
    </>
  );
};

export default App;
