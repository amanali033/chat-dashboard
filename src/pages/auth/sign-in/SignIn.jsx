import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Avatar,
  CssBaseline,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createAPIEndPointAuth } from "../../../config/api/apiAuth";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../../context/UserProfileContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import toast from "react-hot-toast";
import ButtonLoader from "../../../components/loaders/ButtonLoader";
import { logoutUser } from "../../../utils";

const SignIn = () => {
  const navigate = useNavigate();
  const { getUser } = useUserProfile();

  const [show, setShow] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [dontShowMessage, setDontShowMessage] = useState(false);

  const handleClick = () => setShow(!show);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = { email, password };
      const response = await createAPIEndPointAuth("login").create(data);
      setTempToken(response.data.temp_token);
      setShowQrCode(true);

      if (response.data.qr_code) {
        setQrCodeUrl(`data:image/png;base64,${response.data.qr_code}`);
      }
      if (!response.data.qr_code) {
        setDontShowMessage(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  const [check, setCheck] = useState(false);

  const verifyOtp = async () => {
    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (otp.length === 6) {
      try {
        setCheck(true);
        const data = { token: otp, temp_token: tempToken };
        const response = await createAPIEndPointAuth("verify_2fa").create(data);
        checkAuthProfile();
        localStorage.setItem("access_token", response.data.token);
        toast.success(response?.data?.message || "OTP verified successfully!");
      } catch (error) {
        setCheck(false);
        toast.error(error?.response?.data?.error || "OTP verification failed.");
      }
    }
  };

  const checkAuthProfile = async () => {
    const url = `auth_profile`;

    try {
      const response = await createAPIEndPointAuth(url).fetchAll();

      const data = response.data;
      localStorage.setItem("user_profile", JSON.stringify(data.profile));
      localStorage.setItem("user_role", JSON.stringify(data.profile.user_role));

      console.log("Auth Profile fetched successfully:", data);

      await checkDashboard(data);

      return { success: true, data };
    } catch (error) {
      setCheck(false);
      console.error("Error fetching auth profile:", error);
      return { success: false, error: error.message };
    }
  };

  const checkDashboard = async (profileData) => {
    try {
      const url = `dashboard/check`;
      const response = await createAPIEndPointAuth(url).create({
        profile: profileData.profile,
      });
      setTimeout(() => navigate("/"), 1000);
      console.log("Dashboard check response:", response.data);
      getUser();
      setCheck(false);
    } catch (error) {
      setCheck(false);
      toast.error("Dashboard verification failed. Please try again.");
      if (error.response.data.error.includes("Dashboard name does not match")) {
        toast.error("Access to this dashboard is not permitted.");
        setShowQrCode(false);
        logoutUser(navigate);
      }
    }
  };

  useEffect(() => {
    if (otp.length === 6)
      verifyOtp(otp, tempToken, navigate).then(() => {
        checkAuthProfile();
      });
  }, [otp]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => login(values.email, values.password),
  });

  return (
    <div
      style={{
        // backgroundImage:
        //   "linear-gradient(90deg, #020024 0%, #146ef5 35%,rgb(183, 199, 202) 100%)",
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            {qrCodeUrl ? "Verify Otp" : "Sign In"}
          </Typography>

          {!dontShowMessage && (
            <Typography variant="body3">
              Enter your email and password to sign in!
            </Typography>
          )}
          <form onSubmit={formik.handleSubmit}>
            {!showQrCode ? (
              <>
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
                <TextField
                  size="small"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Link
                  href="/auth/forgot-password"
                  variant="body2"
                  style={{
                    textDecoration: "none",
                    mr: "auto",
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  Forgot password?
                </Link>
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
                  {loading ? <ButtonLoader /> : "Sign In"}
                </Button>
              </>
            ) : (
              <>
                {qrCodeUrl && (
                  <>
                    <Typography variant="body3" fontWeight="500">
                      {" "}
                      Scan the QR Code to Proceed
                    </Typography>
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      style={{
                        width: "75%",
                        height: "auto",
                        margin: "0px auto",
                      }}
                    />
                  </>
                )}
                <Typography variant="body2" textAlign="center" fontWeight="500">
                  Enter OTP
                </Typography>

                <Box display="flex" justifyContent="center" mt={2}>
                  <OTPInput
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    numInputs={6}
                    separator={<span style={{ margin: "0 8px" }}>-</span>}
                    inputStyle={{
                      width: "40px",
                      height: "40px",
                      margin: "0 4px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      outline: "none",
                    }}
                    isInputNum
                    shouldAutoFocus
                    renderInput={(props) => (
                      <input {...props} className="otp-input" />
                    )}
                  />
                </Box>

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
                  onClick={verifyOtp}
                >
                  {check ? <ButtonLoader /> : "Verify"}
                </Button>
              </>
            )}
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignIn;
