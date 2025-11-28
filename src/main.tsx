import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./ThemeContext";

createRoot(document.getElementById("root")!).render(<App />);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);