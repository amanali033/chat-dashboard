import React from "react";
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

const SignIn = () => {
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
            borderRadius: 3,
            boxShadow:
              "#82aff9 0px 10px 15px -3px, #82aff9 0px 4px 6px -2px",
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
            Sign In
          </Typography>
          <TextField
            size="small"
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            autoComplete="email"
            sx={{ borderRadius: 2 }}
          />
          <TextField
            size="small"
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ borderRadius: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              mb: 2,
              borderRadius: 2,
              padding: 1,
              textTransform: "capitalize",
            }}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default SignIn;
