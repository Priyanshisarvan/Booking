import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { HelperFunction } from "../../Helper/Helper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUserContact } from "../../../redux/userContactSlice";
import { Link } from "react-router-dom";





const theme = createTheme();

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    HelperFunction();
  }, []);




  const [inputVal, setInputVal] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  
  const contactHandler = async (e) => {
    e.preventDefault();
    if (
      !inputVal.name ||
      !inputVal.email ||
      !inputVal.phone ||
      !inputVal.message
    ) {
      return toast("All Fields are required");
    }
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(inputVal.email)
    ) {
      return toast.error("Invalid email");
    }
    if (inputVal.phone.length < 10 || inputVal.phone.length > 10) {
      return toast.error("Invalid phone number");
    }
    await dispatch(addUserContact(inputVal));
    setInputVal({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <Header />
      <div className="bradcam_area breadcam_bg_4 mb-5">
        <h3>We Are Here For You</h3>
        <p style={{fontSize:30}}>
          <Link to='/' style={{textDecoration:'none',color:'white'}}> Home</Link>
          <Link to='/contact' style={{textDecoration:'none',color:'white'}}> / Contact</Link>
        </p>
      </div>

      <div className="userProfileContainer1">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                CONTACT US
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={contactHandler}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="name"
                      value={inputVal.name}
                      onChange={setVal}
                      label="Name"
                      required
                      fullWidth
                      autoComplete="off"
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
                      onChange={setVal}
                      value={inputVal.phone}
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
                      onChange={setVal}
                      value={inputVal.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                     className="form-detail"
                      required
                      fullWidth
                      id="message"
                      label="Message"
                      name="message"
                      multiline
                      rows={2}
                      autoComplete="off"
                      onChange={setVal}
                      value={inputVal.message}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "black",
                      fontSize: 20,
                    }}
                    className="me-4"
                  >
                    SEND
                  </Button>
                </Grid>


          
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
                  
};

export default Contact;



