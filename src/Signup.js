import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [dialCode, setDialCode] = useState("");

  const handlePhoneNumberChange = (value, country) => {
    setDialCode(country.dialCode);
  };

  useEffect(() => {
    console.log("Contact No-", `+${dialCode} ${phoneNumber}`);
  }, [phoneNumber, dialCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://app.dataconnect.shop/v1/auth/register",
        formData
      );
      if (response.status === 201) {
        alert("Successfully registered!");
        navigate("/Signin");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Registration failed!");
      } else {
        setError("Registration failed!");
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        className="mt-8 flex flex-col items-center px-8"
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" noValidate className="mt-1 w-full">
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

          <div className="flex flex-col justify-center gap-2 w-full items-center mt-4">
            <PhoneInput
              country={"in"}
              inputStyle={{ width: "100%", height: "55px" }}
              buttonStyle={{ height: "55px" }}
              containerStyle={{ display: "inline-block" }}
              dropdownStyle={{ width: "200px" }}
              countryCodeEditable={false}
              onChange={handlePhoneNumberChange}
            />
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="ml-1 flex-1 p-4 w-full text-left border border-gray-300 rounded h-14 outline-none"
            />
          </div>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-3 mb-2 h-12"
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/Signin" variant="body2">
                {"Login if you already have an account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
