import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';


interface Props{
    updateUser : Function;
    updateID : Function;
}

function UserBox({ updateUser, updateID }: Props) {
    function handleSubmit(event: any) {
      event.preventDefault();
  
      axios
        .post('/players', {
          name: event.target.name.value,
          score: 0
        })
        .then((response) => {
          // If successful, update the user's name and ID
          updateUser(response.data.name);
          updateID(response.data._id); // Assuming the response contains _id
          window.location.reload();
        })
        .catch((error) => {
          // Handle error...
          console.log(error);
        });
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="username" required />
        <button type="submit">Create user</button>
      </form>
    );
}

export default UserBox;