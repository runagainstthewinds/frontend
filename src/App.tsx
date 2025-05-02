import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
import SessionPage from "./pages/SessionPage";
import History from "./pages/HistoryPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute";
import StravaCallback from "./components/StravaCallback";
import StravaRouteGuard from "./components/StravaRouteGuard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<SessionPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/strava/callback" element={<StravaRouteGuard><StravaCallback /></StravaRouteGuard>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
