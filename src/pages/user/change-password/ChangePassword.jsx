import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createAPIEndPointAuth } from "../../../config/api/apiAuth";
import toast from "react-hot-toast";
import { getUserData } from "../../../utils";
import ButtonLoader from "../../../components/loaders/ButtonLoader";

const ChangePassword = () => {
  const userData = getUserData();
  const userId = userData?.id ?? null;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        const data = {
          old_password: values.currentPassword,
          new_password: values.newPassword,
        };
        await createAPIEndPointAuth(`user/change_password/`).update(
          userId,
          data
        );

        toast.success("Password updated successfully");
        resetForm();
      } catch (error) {
        toast.error(
          error?.response?.data?.error ||
            "Failed to change password. Please try again."
        );
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            marginBlock: 8,
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
            Change Password
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Current Password"
              type={showPassword.currentPassword ? "text" : "password"}
              {...formik.getFieldProps("currentPassword")}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }
                      edge="end"
                    >
                      {showPassword.currentPassword ? (
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
              label="New Password"
              type={showPassword.newPassword ? "text" : "password"}
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
                    <IconButton
                      onClick={() => togglePasswordVisibility("newPassword")}
                      edge="end"
                    >
                      {showPassword.newPassword ? (
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
              {loading ? <ButtonLoader /> : "Change Password"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ChangePassword;
