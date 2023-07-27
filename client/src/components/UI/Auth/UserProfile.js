import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataByTokenId, updateUser } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDataByTokenId());
  }, [dispatch]);

  const [id, setId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    setId(userState?.getUserDataByTokenId?._id);
    setfirstName(userState?.getUserDataByTokenId?.firstName);
    setlastName(userState?.getUserDataByTokenId?.lastName);
    setPhone(userState?.getUserDataByTokenId?.phone);
    setCity(userState?.getUserDataByTokenId?.city);
    setAddress(userState?.getUserDataByTokenId?.address);
    setEmail(userState?.getUserDataByTokenId?.email);
  }, [userState?.getUserDataByTokenId, userState?.getUserDataByTokenId?.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const d = await dispatch(
      updateUser({ id, firstName, lastName, phone, city, address, email })
    );

    if (d.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  const cancelHandler = () => {
    navigate("/");
  };
  return (
    <div className="userProfileContainer">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              style={{ fontFamily: "cursive", fontSize: 40 }}
            >
              USER PROFILE
            </Typography>

            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "grey",
                marginTop: 5,
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                style={{ color: "white" }}
              >
                {firstName ? firstName[0].toUpperCase() : ""}
              </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 5 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    label="First Name"
                    required
                    fullWidth
                    autoComplete="off"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="off"
                    onChange={(e) => setlastName(e.target.value)}
                    value={lastName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="off"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="off"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="Address"
                    autoComplete="off"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
                  className="me-4"
                >
                  UPDATE
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
                  onClick={cancelHandler}
                >
                  CANCEL
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
