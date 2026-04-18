import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const statusOptions = ["Assigned", "In progress", "Review", "Final"];
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string()
    .oneOf(statusOptions)
    .required("Status is required"),
});
const inputSx = {
  "& .MuiInputBase-input": { fontSize: "14px" },
  "& .MuiInputLabel-root": { fontSize: "14px" },
  "& .MuiFormHelperText-root": { fontSize: "13px" },
};

interface LeadFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (token: string | null, ...args: any[]) => Promise<any>;
  onRefresh: () => void;
  initialValues?: any;
}

const LeadFormDialog = ({
  open,
  onClose,
  onSubmit,
  onRefresh,
  initialValues = {
    title: "",
    description: "",
    status: "",
  },
}: LeadFormDialogProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");

      try {
        if (values?._id) {
    
          await onSubmit(token, values._id, values);
        } else {
     
          await onSubmit(token, values);
        }

        onRefresh();
        resetForm();
        onClose();
      } catch (e) {
        console.error(e);
      }
    },
  });


  useEffect(() => {
    if (!open) formik.resetForm();
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {formik.values?._id ? "Edit Lead" : "Create Lead"}
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>

 
          <TextField
            fullWidth
            label="Title *"
            name="title"
            size="small"
            margin="dense"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={inputSx}
          />

     
          <TextField
            fullWidth
            label="Description *"
            name="description"
            size="small"
            margin="dense"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description &&
              Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description &&
              formik.errors.description
            }
            sx={inputSx}
          />

          <TextField
            select
            fullWidth
            label="Status *"
            name="status"
            size="small"
            margin="dense"
            value={formik.values.status || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            sx={inputSx}
          >
            <MenuItem  sx={{fontSize:'14px'}} value="" disabled>
              Select Status
            </MenuItem>

            {statusOptions.map((s) => (
              <MenuItem  sx={{fontSize:'14px'}} key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LeadFormDialog;