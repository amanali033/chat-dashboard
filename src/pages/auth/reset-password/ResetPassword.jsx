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
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createAPIEndPointAuth } from "../../../config/api/apiAuth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ButtonLoader from "../../../components/loaders/ButtonLoader";
import { getUserData } from "../../../utils";

const ResetPassword = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      const data = {
        user_id: userData?.id,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      };

      const response = await createAPIEndPointAuth(
        "admin_change_password"
      ).create(data);
      toast.success(response.data.message || "Password reset successfully!");
      navigate("/auth/sign-in");
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
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema,
    onSubmit: (values) => handleResetPassword(values),
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
            <LockIcon />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Reset Password
          </Typography>
          <Typography variant="body2" textAlign="center" gutterBottom>
            Enter your new password below.
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("newPassword")}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? (
                        <VisibilityOff
                          sx={{ fontSize: 15, color: "#bdc3c7" }}
                        />
                      ) : (
                        <Visibility sx={{ fontSize: 15, color: "#bdc3c7" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...formik.getFieldProps("confirmPassword")}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff
                          sx={{ fontSize: 15, color: "#bdc3c7" }}
                        />
                      ) : (
                        <Visibility sx={{ fontSize: 15, color: "#bdc3c7" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            href="/auth/login"
            variant="body2"
            display="flex"
            alignItems="center"
            sx={{ mt: 2, textDecoration: "none" }}
          >
            <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} /> Back to Login
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetPassword;
