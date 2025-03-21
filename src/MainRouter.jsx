import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import Inbox from "./pages/messages/inbox/Inbox";
import NotFound from "./pages/404";
import RecentCalls from "./pages/calls/recent-calls/RecentCalls";
import SignIn from "./pages/auth/sign-in/SignIn";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import ProtectedRoute from "./hooks/ProtectedRoute";
import Voicemail from "./pages/calls/voice-mails/Voicemail";
import Profile from "./pages/user/profile/Profile";
import ChangePassword from "./pages/user/change-password/ChangePassword";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages  */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Layout />
            // </ProtectedRoute>
          }
        >
          {/* user pages  */}
          <Route path="/user-profile" element={<Profile />} />
          <Route
            path="/settings/change-password"
            element={<ChangePassword />}
          />

          <Route path="/" element={<Navigate to="/messages/inbox" />} />

          <Route path="/messages/inbox" element={<Inbox />} />
          <Route path="/calls/recent" element={<RecentCalls />} />
          <Route path="/calls/voicemails" element={<Voicemail />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
