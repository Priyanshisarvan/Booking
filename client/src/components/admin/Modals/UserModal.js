import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(prop) {

  return (
    <div>
      <Dialog
        open={prop.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={prop.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Are you sure you want to delete this user and if it's yes then please
          enter reason below?
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mt-4">
            <TextField
              name="Reason"
              value={prop.deleteReason}
              onChange={(e) => prop.setDeleteReason(e.target.value)}
              label="Reason"
              required
              fullWidth
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={prop.handleClose} style={{color:'red',fontWeight:'bold'}}>Cancel</Button>
          <Button onClick={prop.deleteHandler} style={{color:'green',fontWeight:'bold'}}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
