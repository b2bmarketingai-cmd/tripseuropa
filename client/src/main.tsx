import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

(window as any).__REACT_STATUS = 'module-loaded';

try {
  (window as any).__REACT_STATUS = 'creating-root';
  const root = createRoot(document.getElementById("root")!);
  (window as any).__REACT_STATUS = 'rendering';
  root.render(<App />);
  (window as any).__REACT_STATUS = 'mounted';
} catch (err) {
  (window as any).__REACT_STATUS = 'error: ' + (err instanceof Error ? err.message : String(err));
  const el = document.getElementById("root");
  if (el) {
    el.innerHTML = '<div style="padding:2rem;color:red;font-family:monospace;white-space:pre-wrap">RENDER ERROR: ' + (err instanceof Error ? err.message + '\n' + err.stack : String(err)) + '</div>';
  }
}
