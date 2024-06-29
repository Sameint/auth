import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import "./App.css";
function Signup() {
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
 
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); 
  
  const handlePhoneNumberChange = (isValid, value, countryData) => {
    const dialCode = `+${countryData.dialCode}`;
    const phoneNumberWithoutDialCode = value.replace(dialCode, "").trim();
    setCountryCode(dialCode);
    setPhoneNumber(phoneNumberWithoutDialCode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://app.dataconnect.shop/v1/auth/register', formData);
      if (response.status === 201) {
        alert('Successfully registered!');
        navigate('/Signin');
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration failed!');
      } else {
        setError('Registration failed!');
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
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
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
          />
           <IntlTelInput
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            preferredCountries={["IN"]}
            style={{ marginTop: "20px", border: "1px solid lightgray" }}
            onPhoneNumberChange={handlePhoneNumberChange}
            value={`${countryCode}${phoneNumber}`}
            formatOnInit={false}
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
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/Signin" variant="body2">
                {"login if already account you have"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
