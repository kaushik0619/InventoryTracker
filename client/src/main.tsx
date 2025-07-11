import { createRoot } from "react-dom/client";
import SimpleApp from "./SimpleApp";
import "./index.css";

console.log("main.tsx loaded");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
  document.body.innerHTML = "<h1>Error: Root element not found!</h1>";
} else {
  console.log("Creating React app...");
  const root = createRoot(rootElement);
  root.render(<SimpleApp />);
  console.log("React app rendered");
}
