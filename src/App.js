import './App.css';
import Signup from './Component/SignUp';
import Login from './Component/Login';
import Feed from './Component/Feed';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './Component/PrivateRoute';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <>
     <BrowserRouter>
     <AuthProvider>
        <Routes>
    
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />  

          {/* Private Routes */}
            <Route element={<PrivateRoute />}>
            <Route path='/' element={<Feed />} />
          </Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter> 
      


    </>
  );
}

export default App;
