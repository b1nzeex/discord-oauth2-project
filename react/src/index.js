import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>
);
