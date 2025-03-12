import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import TimeZoneSelect from "../../../components/time-zone-select";
import { useUserProfile } from "../../../context/UserProfileContext";
import { createAPIEndPointAuth } from "../../../config/api/apiAuth";
import toast from "react-hot-toast";
import { getUserData } from "../../../utils";
import ButtonLoader from "../../../components/loaders/ButtonLoader";
import BackButton from "../../../components/back-button";

function Profile() {
  const userData = getUserData();
  const userId = userData?.id ?? null;

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const response = await createAPIEndPointAuth("user").fetchById(
          `/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize: true, // Important to update form when user data loads
    initialValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      timezone: user.timezone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(
          /^\(\d{3}\) \d{3}-\d{4}$/,
          "Phone number must be in format (XXX) XXX-XXXX"
        )
        .required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      timezone: Yup.string().required("Timezone is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true); // Set submitting to true
      try {
        await createAPIEndPointAuth("user/").update(userId, values);
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Profile update failed.");
      } finally {
        setIsSubmitting(false); // Reset submitting state
      }
    },
  });

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return value;

    const formatted = !match[2]
      ? match[1]
      : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;

    return formatted.length > 14 ? formatted.slice(0, 14) : formatted; // Limit to 14 characters
  };

  return (
    <div style={{ position: "relative", overflowY: "auto" }}>
      <BackButton />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Edit Profile
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              size="small"
              {...formik.getFieldProps("first_name")}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              size="small"
              {...formik.getFieldProps("last_name")}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              size="small"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              size="small"
              value={formik.values.phone} // Ensure value is controlled
              onChange={(e) => {
                const formattedNumber = formatPhoneNumber(e.target.value);
                formik.setFieldValue("phone", formattedNumber); // Update Formik state
              }}
              inputProps={{ maxLength: 14 }}
              onBlur={formik.handleBlur} // Ensure Formik handles blur events
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <TextField
              label="Address"
              fullWidth
              margin="normal"
              size="small"
              {...formik.getFieldProps("address")}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TimeZoneSelect
              values={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, borderRadius: "4px", textTransform: "capitalize" }}
              type="submit"
            >
              {isSubmitting ? <ButtonLoader /> : "Update Profile"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default Profile;
