import "./App.css";
import Navbar from "./components/ui/navbar";
import LandingPage from "./pages/LandingPage";
import SessionPage from "./pages/SessionPage";

function App() {
  return (
    <>
      
      <Navbar />
      <LandingPage />
      {/* <Navbar /> */}
      <SessionPage />
      {/* <LandingPage /> */}
    </>
  );
}

export default App;
