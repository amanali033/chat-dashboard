import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinesLoader from "../../components/loaders/LinesLoader";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#146ef5" }}>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>

        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            py: 10,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            color: "white",
          }}
        >
          <Typography variant="h1" fontWeight={900} gutterBottom>
            404 ERROR
          </Typography>
          <Typography variant="h5" gutterBottom>
            Oops! The page you are looking for does not exist.
          </Typography>
          <Typography color="white" mb={4}>
            It might have been moved or deleted. Please check the URL or return
            to the homepage.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              color: "#146ef5",
              backgroundColor: "white",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default NotFound;

// <div>
// <LinesLoader />
// <Box
//   sx={{
//     position: "relative",
//     width: "100vw",
//     height: "100vh",
//     overflow: "hidden",
//     display: "flex",
//     alignItems: "center",
//   }}
// >
//   <Container
//     maxWidth="sm"
//     sx={{
//       textAlign: "center",
//       py: 10,
//       // height: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       position: "relative",
//       zIndex: 1,
//       color: "white",
//       backgroundColor: "rgba(255,255,255,0.5)",
//       boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
//       backdropFilter:"blur(2px)"
//     }}
//   >
//     <Typography
//       variant="h2"
//       color="primary"
//       fontWeight={900}
//       gutterBottom
//     >
//       404 ERROR
//     </Typography>
//     <Typography variant="h5" color="text.primary" gutterBottom>
//       Oops! The page you are looking for does not exist.
//     </Typography>
//     <Typography variant="body1" mb={4}>
//       It might have been moved or deleted. Please check the URL or return
//       to the homepage.
//     </Typography>
//     <Button
//       variant="contained"
//       size="large"
//       sx={{
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         borderRadius: "12px",
//         color: "#fff",
//         backgroundColor: "#146ef5",
//         textTransform: "capitalize",
//         fontWeight: "bold",
//       }}
//       onClick={() => navigate("/")}
//     >
//       Go Home
//     </Button>
//   </Container>
// </Box>
// </div>
