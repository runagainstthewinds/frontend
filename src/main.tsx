import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupAuthFromStorage } from "./api/auth";
import { UnitProvider } from "./context/UnitContext.tsx";

setupAuthFromStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UnitProvider>
      <App />
    </UnitProvider>
  </StrictMode>,
);
