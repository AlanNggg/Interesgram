import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withCookies } from "react-cookie";
// import jwt_decode from "jwt-decode";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import store from "./redux/store";
import { getCurrentUser } from "./redux/actions/auth";

class App extends Component {
  // const cookies = new Cookies();
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: [],
      login: false,
    };
  }

  componentDidMount() {
    store.dispatch(getCurrentUser());
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Home} />
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/:name" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
