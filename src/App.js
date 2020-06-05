import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Register from "./Components/Register";
//import { Login, Register, HomePage } from "./Components/index.js";
import { AuthProvider } from "./Components/Auth";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="./login" component={Login} />
          <Route exact path="./register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
