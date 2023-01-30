import React, { useState } from "react";
import { useEffect } from "react";
import { database } from "../FireBase";
import {
    addDoc, collection, Timestamp, query, orderBy, onSnapshot, QuerySnapshot, getDoc, getDocs
} from 'firebase/firestore'
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from '@mui/material/Avatar';
import Video from "./Video";
import './Posts.css'
// import Like from "./Like";

function Posts({ userData }) {
    const [posts,setPosts] = useState(null);
    useEffect(()=>{
        getPostData()
    
      },[])

  const getPostData = async () => {

    function getArrangedData() {
      return new Promise((resolve, reject) => {
        const postRef = collection(database, "posts");

        const q = query(postRef, orderBy("createdAt", "desc"));

        onSnapshot(q, (querySnapshot) => {
          const posts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          if (posts) {
            resolve(posts);
          } else {
            reject("Unable to fetch Data");
          }
        });
      });
    }

    
    
    const posts =  await getArrangedData();
    setPosts(posts)
  };

  const callback = (entries) => {
    entries.forEach((entry)=>{
        let ele = entry.target.childNodes[0];
        console.log(ele)
        ele.play().then(()=>{
            if (!ele.paused && !entry.isIntersecting) {
                ele.paused()
                
            }
        })

    })
}
  
  let observer = new IntersectionObserver(callback, {threshold: 0.6});
  useEffect(()=>{
    const elements = document.querySelectorAll(".videos")
    elements.forEach((element)=>{
        observer.observe(element)
    })
    return ()=>{
      observer.disconnect();
    }
  },[posts])
 

 
  return (
    <div>
      {posts == null || userData == null ?  <CircularProgress /> : 
        <div className="video-container">
          {
          posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} />
                <div className="fa" style={{display:"flex"}}>
                {/* <Avatar src={userData.profileUrl} />  */}
                <h4>{userData.fullName}</h4>
                </div>
                {/* <Like userData={userData} postData={post}/> */}
              </div>
            </React.Fragment>
          ))
      }
        </div>
      }
    </div>
  );
}

export default Posts;
