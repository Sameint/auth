import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 
  const [error,setError]=useState('');
  const [errors,setErrors]=useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({...errors,[name]:""})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid=true;
    let newError={
      email:"",
      password:""
    }

    if(!formData.email){
      newError.email="Email is required"
      valid=false;
    }

    if(!formData.password){
      newError.password="Password is required"
      valid=false;
    }
    
    setError('')
    setErrors(newError);

     if(!valid) return true;

    try {
      const response = await axios.post('https://app.dataconnect.shop/v1/auth/login', formData);
      if (response.status === 200) {
        const user = response.data.user;
        alert('Login successful!');
        navigate('/Home',{ state: { email: user.email, name: user.name } }); 
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      if(error.response && error.response.data){
        setError(error.response.data.message || 'Login failed!' )
      }else{
        setError('Login failed!')
      }
      
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Signin;
