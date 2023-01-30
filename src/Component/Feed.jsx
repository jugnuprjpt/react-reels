import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import UploadFile from './UploadFile.jsx'
import Posts from "./Posts";
import { database, auth } from "../FireBase";

function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData,setUserData] = useState('')

    auth.onAuthStateChanged(currentUser => {
      setUserData(currentUser);
    })
    
  return (
    <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "coloumn",
      }}
    >
      <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to Feed</h1>
        <button onClick={logout}>Log Out</button>
        <UploadFile user = {user}/>
        <Posts userData = {userData}/>
      </div>
    </div>
  );
}

export default Feed;
