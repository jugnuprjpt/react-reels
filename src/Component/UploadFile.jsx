import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import { database, storage } from "../FireBase";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@mui/material";

function UploadFile(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0)
  
  const handleChange = async (file) => {
    
    try {
      if (file == null) {
        setError("please select file first");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
      if (file.size / (1024 * 1024) > 100) {
        setError("This is very big");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }

      let uid = uuidv4();
      const imgRef = ref(storage, `posts/${file.name + uid}`);
      const uploadTask = uploadBytesResumable(imgRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pg = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(pg)
        },
        null,
        async () => {
          setProgress(0)
          setLoading(true);
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          // setImgUrl(res);
          let obj = {
            likes: 0,
            comments: [{ id: 20, content: "" }],
            pId: uid,
            pUrl: url,
            uName: props.user.displayName,
            uProfile: props.user.photoURL,
            userId: props.user.uid,
            createdAt: Timestamp.now(),
          };

          const res = await addDoc(collection(database, "posts"), obj);
          console.log(res);
          setLoading(false);
        }
      );
    } catch (err) { 
      console.log("error");
      setLoading(false);
    }

  };
  return (
    <div>
      {error !== "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            onChange={(e) => handleChange(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              color="secondary"
              component="span"
              disabled={loading}
            >
              <FileUploadIcon />
              Upload Video
            </Button>
          </label>
          {progress > 0 && (
            <LinearProgress variant="determinate" color="secondary" style={{ marginTop: "3%" }} value={progress}/>
          )}
          {loading && <CircularProgress />}
        </>
      )}
    </div>
  );
}

export default UploadFile;
