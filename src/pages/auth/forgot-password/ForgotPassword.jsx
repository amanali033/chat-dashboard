import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  CssBaseline,
  Paper,
  Link,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createAPIEndPointAuth } from "../../../config/api/apiAuth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ButtonLoader from "../../../components/loaders/ButtonLoader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async (values) => {
    try {
      setLoading(true);
      const data = { email: values.email };
      const response = await createAPIEndPointAuth("forgot-password").create(
        data
      );
      toast.success(response.data.message);
      navigate("/auth/reset-password");
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => handleForgetPassword(values),
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 0,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Forgot Password
          </Typography>
          <Typography variant="body2" textAlign="center" gutterBottom>
            Enter your email to receive a password reset link.
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              autoComplete="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: "4px",
                padding: 1,
                textTransform: "capitalize",
              }}
              type={!loading ? "submit" : "button"}
            >
              {loading ? <ButtonLoader /> : "Reset Password"}
            </Button>
          </form>
          <Link
            href="/auth/sign-in"
            variant="body2"
            display="flex"
            alignItems="center"
            sx={{ textDecoration: "none" }}
          >
            <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} /> Back to Login
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
