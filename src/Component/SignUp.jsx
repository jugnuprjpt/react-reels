import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import BackupIcon from "@mui/icons-material/Backup";
import Alert from "@mui/material/Alert";
import "./SignUp.css";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState, useContext } from "react";
import { database, storage } from "../FireBase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const uploadFile = async (id) => {
    if (file === null) return;

    const imgRef = ref(storage, `users/${file.name + id}`);
    const uploadTask = uploadBytesResumable( imgRef, file);

    uploadTask.on("state_changed", null, null, async () => {
      const res = await getDownloadURL(uploadTask.snapshot.ref);
      setImgUrl(res);
    });
  };
  const handleClick = async () => {
    if (file == null) {
      setError("Please upload Profile picture");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      setError("");
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      await uploadFile(uid);


    const res = await addDoc(collection(database, 'users'), {
        email: email,
        userId:uid,
        // uid: uid,
        fullName: name,
        profileUrl: imgUrl,
        createdAt: Timestamp.now(),
      });

      setLoading(false);
      if (res) {
        navigate("/");
      }

      
      //   const uploadTask = storage.ref(`users/${uid}/ProfileImage`).put(file);
      //   uploadTask.on('state_changed',fn1,fn2,fn3);

      //   function fn1(snapshot) {
      //      let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      //      console.log(`Upload is ${progress} done`)

      //   }
      //   function fn2 (error) {
      //     setError(error?.message);
      //     setTimeout(() => {
      //     setError("");
      //   }, 2000);
      //   setLoading(false)
      //   return;

      //   }

      //   function fn3 () {
      //     uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
      //         console.log(url);
      //         database.users.doc(uid).set({
      //             email:email,
      //             userId:uid,
      //             fullname:name,
      //             profileUrl:url,
      //             createdAt:database.getTimeStamp()
      //         })
      //         setLoading(false);
      //         navigate.push('/')
      //     })

      //   }
    } catch (err) {
      console.log(err);
      setError(err?.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="zypa_logo">
            <img
              src="https://www.zyapaar.com/static/assets/logo.89e27487.svg"
              alt=""
            />
            {/* <h1>Reels</h1> */}
          </div>

          <CardContent>
            <Typography variant="subtitle1">
              Sign up videos and Photos your Friend
            </Typography>

            {error != "" && <Alert severity="error">{error}</Alert>}

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Passward"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button
              size="small"
              color="secondary"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              startIcon={<BackupIcon />}
              component="label"
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              disable={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </CardActions>

          <CardContent>
            <Typography variant="subtitle1">
              By signing up, you agree to our terms.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">
              Having an account ?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default SignUp;
