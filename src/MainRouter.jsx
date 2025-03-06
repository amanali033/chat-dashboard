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

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages  */}
        <Route path="/auth/sign-in" element={<SignIn />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/messages/inbox" />} />

          {/* Messages Pages  */}
          <Route path="/messages/inbox" element={<Inbox />} />

          {/* Calls Pages  */}
          <Route path="/calls/recent" element={<RecentCalls />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
