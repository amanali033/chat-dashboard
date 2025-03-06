import MainRouter from "./MainRouter";
import { CssBaseline } from "@mui/material";
import "./App.css";
import { UserProfileProvider } from "./context/UserProfileContext";

function App() {
  return (
    <>
      <UserProfileProvider>
        <CssBaseline />
        <MainRouter />
      </UserProfileProvider>
    </>
  );
}

export default App;
