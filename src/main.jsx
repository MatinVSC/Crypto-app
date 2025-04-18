import { ErrorBoundary } from "react-error-boundary";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './i18n';
import ErrorFallback from "./ui/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
