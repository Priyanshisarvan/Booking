import React, { useState, useEffect } from "react";
import Header from "../../UI/Common/Header";
import Footer from "../../UI/Common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsById } from "../../../redux/adRoomSlice";
import { roomBooking } from "../../../redux/bookingSlice";
import { toast } from "react-toastify";
import { HelperFunction } from "../../Helper/Helper";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";


const theme = createTheme();

const BookNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomState = useSelector((state) => state.addRoom);

  useEffect(() => {
    HelperFunction();
  }, []);

  const [inputVal, setInputVal] = useState({
    noOfAdults: "",
    noOfChildren: "",
    checkIn: new Date().toISOString().slice(0, 10),
    checkOut: new Date().toISOString().slice(0, 10),
    noOfDays: "",
    payment: "",
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

  useEffect(() => {
    if (inputVal.checkOut) {
      const date1 = new Date(inputVal.checkIn);
      const date2 = new Date(inputVal.checkOut);
      const diff = Math.abs(date2 - date1);
      const diffDays = Math.round(diff / 86400000);
      setInputVal({ ...inputVal, noOfDays: diffDays });
    }
  }, [inputVal,inputVal.checkOut, inputVal.checkIn]);

  useEffect(() => {
    dispatch(getRoomsById(id));
  }, [dispatch]);

  const bookNowHandler = async (e) => {
    e.preventDefault();

    if (
      inputVal.noOfAdults > roomState?.roomById?.noOfAdults ||
      inputVal.noOfAdults < 1
    ) {
      return toast("Invalid Number of Adults");
    } else if (
      inputVal.noOfChildren > roomState?.roomById?.noOfChildren|| inputVal.noOfChildren<0
    ) {
      return toast("Invalid Number of Children");
    }
    else if (inputVal.checkIn === inputVal.checkOut) {
      return toast("Invalid checkout date");
    } else {
      await dispatch(roomBooking({ id, inputVal }));
      navigate("/booking");
    }
  };



  return (
    <>
      <Header />

      <div className="bradcam_area breadcam_bg_1 mb-5">
        <h3>Book Now</h3>
      </div>
      <div className="container myBookNow py-5 px-5 m-auto mb-5 mt-5">
        <div className="row">
          <div className=" col-lg-6 containerBookNow1">
            <div className="subContainerBookNow1">
            <div>
              <img
                src={roomState.roomById.url}
                height={350}
                width={550}
                className="mb-5 bookNowImage"
              
              />
              </div>
              <TableContainer>
                <Table
                  sx={{ minWidth: 650, backgroundColor: "transparent" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                        }}
                        align="left"
                      >
                        ROOM CATEGORY :
                      </TableCell>
                      <TableCell align="left">
                        {roomState?.roomById?.roomCategoryId?.roomCategory}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                        }}
                        align="left"
                      >
                        ROOM TYPE:
                      </TableCell>
                      <TableCell align="left" colSpan={5}>
                        {roomState?.roomById?.roomType}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                        }}
                        align="left"
                      >
                        ROOM PRICE :
                      </TableCell>
                      <TableCell align="left">
                        {roomState?.roomById?.price}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                        }}
                        align="left"
                      >
                        SIZE:
                      </TableCell>
                      <TableCell align="left" colSpan={5}>
                        {roomState?.roomById?.noOfAdults} Adults &nbsp; & &nbsp;
                        {roomState?.roomById?.noOfChildren} Children
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                        }}
                        align="left"
                      >
                        FACILITIES :
                      </TableCell>
                      <TableCell align="left">
                        <i className="bi bi-tv me-2"></i>TV &nbsp;
                        <i className="bi bi-clipboard2 me-1"></i>
                        FRIDGE &nbsp;&nbsp;
                        <i className="bi bi-wifi me-2"></i>WIFI
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                        }}
                        align="left"
                      >
                        DESCRIPTION:
                      </TableCell>
                      <TableCell align="left" colSpan={5}>
                        {roomState?.roomById?.description}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer> 
            </div>
          </div>

          <div className="col-lg-6 containerBookNow2 d-flex justify-content-center py-4">
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
                  <Typography component="h1" variant="h5">
                    BOOK ROOM
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          type="number"
                          name="noOfAdults"
                          value={inputVal.noOfAdults}
                          onChange={setVal}
                          label="No of Adults"
                          required
                          fullWidth
                          InputProps={{
                            inputProps: {
                              min: 0,
                              max: roomState.roomById.noOfAdults,
                            },
                          }}
                          autoComplete="off"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          type="number"
                          label="No of Children"
                          name="noOfChildren"
                          autoComplete="off"
                          InputProps={{
                            inputProps: {
                              min: 0,
                              max: roomState.roomById.noOfChildren,
                            },
                          }}
                          value={inputVal.noOfChildren}
                          onChange={setVal}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="date"
                          required
                          fullWidth
                          label="checkInDate"
                          name="checkIn"
                          autoComplete="off"
                          value={inputVal.checkIn}
                          onChange={setVal}
                          inputProps={{
                            min: new Date().toISOString().slice(0, 10),
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="date"
                          required
                          fullWidth
                          label="checkOutDate"
                          name="checkOut"
                          autoComplete="off"
                          value={inputVal.checkOut}
                          onChange={setVal}
                          inputProps={{
                            min: new Date().toISOString().slice(0, 10),
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          required
                          hidden={'true'}
                          disabled
                          fullWidth
                          label="NoOfDays"
                          name="noOfDays"
                          autoComplete="off"
                          value={inputVal.noOfDays}
                          onChange={setVal}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 390 }}>
                          <InputLabel
                            id="demo-simple-select-label"
                            className="float-start"
                          >
                            Payment
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputVal.payment}
                            label="Payment"
                            fullWidth
                            name="payment"
                            onChange={setVal}
                          >
                            <MenuItem value={"Select Payment Mode"}>
                              Select Payment Mode
                            </MenuItem>
                            <MenuItem value={"Payment On Arrival"}>
                              Payment On Arrival
                            </MenuItem>
                            <MenuItem value={"Online Payment"}>
                              Online Payment
                       
                            </MenuItem>
                          </Select>
                        </FormControl>
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
                        onClick={bookNowHandler}
                      >
                        BOOK
                      </Button>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookNow;
