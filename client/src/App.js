import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navigation from "./components/Navigation/Navigation";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import config from "./config";
import "./App.css";

import { Provider } from "react-redux";
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

  async componentDidMount() {
    store.dispatch(getCurrentUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/" component={<Home />} />
            <Route exact path="/:name" component={<Profile />} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withCookies(App);
