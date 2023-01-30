import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import BackupIcon from '@mui/icons-material/Backup';
import Alert from '@mui/material/Alert';
import { useContext,useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import './login.css'
import {Link,useNavigate} from 'react-router-dom'

export default function Login() {
    const store = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  

  const handleClick = async()=>{
    try {
          setError('')
          setLoading(true)
          let res = await login (email,password);
          setLoading(false);
          navigate("/");

    }catch(err){
        // setError(err?.message);
        setError("invalid email/pass")
        setTimeout(()=>{
            setError("")
        },5000);
        setLoading(false);
    }}
  

  return (
    <div className="loginupWrapper">
        <div className="loginupCard">

    <Card variant='outlined'>
      <div className="zypa_logo">
        <img src="https://www.zyapaar.com/static/assets/logo.89e27487.svg" alt="" />
      </div>
     
      <CardContent>
        <Typography  variant="subtitle1" >
         Sign up videos and Photos your Friend
        </Typography>
        { error && <Alert severity="error">{error}</Alert>}
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense'size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <TextField id="outlined-basic" label="Passward" variant="outlined" fullWidth={true} margin='dense'size='small' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        
        <Typography  variant="subtitle1" >
       Forget Password
        </Typography>
        
            </CardContent>
      <CardActions>
        <Button color='primary' fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
            Login Up
            </Button>
      </CardActions>

        </Card>  

        <Card variant='outlined'> 
      <CardContent>
        <Typography variant="subtitle1" >
         Don't have a account ? <Link to = '/signup' style={{textDecoration:'none'}}>Login</Link>
        </Typography>
        </CardContent>
    </Card>    
    </div>
    </div>
  );
}
