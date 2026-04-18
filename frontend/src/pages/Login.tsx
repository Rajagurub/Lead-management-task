import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { Admin_login_Service } from "../_api_/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login=()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();

     const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async(values:any) => {
      try{
     
        const result = await Admin_login_Service.LoginAdmin(values);
        if(result.status<400){
          localStorage.setItem("token", result.data.token);
           dispatch(
    setUser({
      token: result.data.token,
      username: result.data.admin.name,
      email: result.data.admin.email,
      role: result.data.admin.role,
    })
  );
  localStorage.setItem(
  "user",
  JSON.stringify({
    token: result.data.token,
    username: result.data.admin.name,
    email: result.data.admin.email,
    role: result.data.admin.role,
  })
);
        
    toast.success(
   result?.message|| "Login successfull!"
  );
  navigate("/dashboard");
        }
        console.log(result.data,"result")
      }
      catch(e){
  toast.error(
    e?.error?.message || e?.message || "Login failed!"
  );
console.log("Login data:",typeof e );
      }
      
    },
  });

    return (
      <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
    
        <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <TextField
             
                fullWidth
                margin="normal"
                label="Email"
                 size="small"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                   size="small"
                fullWidth
                margin="normal"
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, py: 1.2 ,borderRadius:"10px"}}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
  
    </Box>
    )
}
export default Login;