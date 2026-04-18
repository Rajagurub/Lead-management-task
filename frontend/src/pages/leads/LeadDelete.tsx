import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onDeleteFunction: () => void;
}

const LeadDelete = ({ open, onClose, onDeleteFunction }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onDeleteFunction}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadDelete;