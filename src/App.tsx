import "./App.css";
import GoogleCalendarConnect from "./components/ui/GoogleCalendarConnect";
import Navbar from "./components/ui/navbar";
import LandingPage from "./pages/LandingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SessionPage from "./pages/SessionPage";

function App() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <GoogleCalendarConnect />
      </GoogleOAuthProvider>
      {/* <Navbar /> */}
      <SessionPage />
      {/* <LandingPage /> */}
    </>
  );
}

export default App;
