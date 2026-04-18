import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from '@mui/material';
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const roles = ["executive manager", "sales manager"];
const statusList = ["active", "inactive"];

const UserFormDialog = ({ open, onClose, initialValues, onSubmit,onFrefh }: any) => {
    const theme= useTheme();
      const token = useSelector((state: RootState) => state.user.token)||localStorage.getItem('token');
console.log(token,"userCreate")
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      userName: "",
      empId: "",
      email: "",
      mobileNo: "",
      role: "",
      status: "active",
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("User name is required"),
      empId: Yup.string().required("Employee ID is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
        .required("Mobile number is required"),
      role: Yup.string().required("Role is required"),
      status: Yup.string().required("Status is required"),
    }),

    onSubmit: async (values, { setFieldError }) => {
      try {
        const payload = {
          ...values,
          email: values.email.toLowerCase(),
          empId: values.empId.toLowerCase(),
        };
        console.log(initialValues,"objeid")
       if(initialValues?._id){
        const id=initialValues._id;
              const res = await onSubmit(token,payload,id);
               toast.success(
           res?.message|| "updated successfull!"
          );
          onFrefh();
        onClose();
       }
       else{
          const res = await onSubmit(token,payload);
           toast.success(
           res?.message|| "created successfull!"
          );
          onFrefh();
        onClose();
       }
      
        
      } catch (err: any) {
        const msg = err?.response?.data?.message || "";
 toast.error(
           err?.message|| e?.error?.message || "creation failed!"
          );
        if (msg.includes("empId")) {
          setFieldError("empId", "Employee ID already exists");
        }
        if (msg.includes("email")) {
          setFieldError("email", "Email already exists");
        }
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{"& .MuiPaper-rounded":{
      borderRadius:'20px'
    }}} >
      <DialogTitle sx={{fontSize:'15px!important'}}>{initialValues ? "Edit User" : "Create User"}</DialogTitle>

      <DialogContent >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1,borderRadius:'10px' }}
        >
          <TextField label="User Name *" name="userName" {...formik.getFieldProps("userName")}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            size="small"
           sx={{
    '& .MuiInputBase-input': {
      fontSize: '14px', 
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px', 
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', 
    }
  }}
          />

          <TextField label="Employee ID *" name="empId" {...formik.getFieldProps("empId")}
            error={formik.touched.empId && Boolean(formik.errors.empId)}
            helperText={formik.touched.empId && formik.errors.empId}
                size="small"
                 sx={{
    '& .MuiInputBase-input': {
      fontSize: '14px', 
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px', 
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', 
    }
  }}
          />

          <TextField label="Email *" name="email" {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
                size="small"
                 sx={{
    '& .MuiInputBase-input': {
      fontSize: '14px', 
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px', 
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', 
    }
  }}
          />

          <TextField label="Mobile No *" name="mobileNo" {...formik.getFieldProps("mobileNo")}
            error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
            helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                size="small"
                 sx={{
    '& .MuiInputBase-input': {
      fontSize: '14px', 
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px', 
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', 
    }
  }}
          />

          <TextField select label="Role *" {...formik.getFieldProps("role")}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
                size="small"
                 sx={{
    '& .MuiInputBase-input': {
      fontSize: '14px', 
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px', 
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', 
    }
  }}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
          </TextField>

          <TextField select label="Status *" {...formik.getFieldProps("status")}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
                size="small"
                 sx={{
    '& .MuiInputBase-input': {
      fontSize: '14px', 
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px', 
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', 
    }
  }}
          >
            {statusList.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>

          <DialogActions sx={{ px: 0,justifyContent:'flex-start',display:'flex' }}>
            <Button variant="contained" sx={{backgroundColor:theme.palette.grey[100],borderRadius:'10px',
              fontWeight:400,fontSize:'14px'
              ,color:theme.palette.primary.main,border:`1px solid ${theme.palette.primary.main}`}} onClick={onClose}>Cancel</Button>
            <Button sx={{   borderRadius:'10px',fontWeight:400,fontSize:'14px'}} type="submit" variant="contained">
              {initialValues ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;