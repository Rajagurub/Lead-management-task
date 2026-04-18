import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { userApiServices } from "../../_api_/user";
interface UserDeleteProps {
  open: boolean;
  onClose: () => void;
  onDeleteFunction: () => void;
}
const UserDelete = ({ open, onClose, onDeleteFunction }:UserDeleteProps) => {


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontSize: "16px" }}>
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ fontSize: "14px" }}>
          Are you sure you want to delete this record?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
        >
          Cancel
        </Button>

        <Button
          onClick={onDeleteFunction}
          variant="contained"
          color="error"
          size="small"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDelete;