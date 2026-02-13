import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

try {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
} catch (err) {
  const el = document.getElementById("root");
  if (el) {
    el.innerHTML = '<div style="padding:2rem;color:red;font-family:monospace;white-space:pre-wrap">RENDER ERROR: ' + (err instanceof Error ? err.message + '\n' + err.stack : String(err)) + '</div>';
  }
}

window.addEventListener('error', (e) => {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;padding:1rem;background:red;color:white;font-family:monospace;z-index:99999;font-size:12px;white-space:pre-wrap';
  el.textContent = 'JS ERROR: ' + e.message + ' at ' + e.filename + ':' + e.lineno;
  document.body.appendChild(el);
});

window.addEventListener('unhandledrejection', (e) => {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;padding:1rem;background:orange;color:black;font-family:monospace;z-index:99999;font-size:12px;white-space:pre-wrap';
  el.textContent = 'PROMISE ERROR: ' + (e.reason instanceof Error ? e.reason.message + '\n' + e.reason.stack : String(e.reason));
  document.body.appendChild(el);
});
