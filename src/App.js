import React, { useState } from "react";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./styles.css";
//react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
//context
import { UserContext } from "./context/UserContext";
//components
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
//layouts
import Footer from "./layout/Footer";
import Header from "./layout/Header";
//firebase
import firebase from "firebase/app";
import "firebase/auth";
//firebase config
import firebaseConfig from "./Config/firebaseConfig";
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
