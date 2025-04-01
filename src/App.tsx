import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
import SessionPage from "./pages/SessionPage";
import History from "./pages/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<SessionPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
