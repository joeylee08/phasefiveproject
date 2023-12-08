import React from "react";
import * as ReactDOM from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);