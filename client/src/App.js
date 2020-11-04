import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import Main from "./Main/Main";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import Profile from "./Profile/Profile";
import config from "./config";
import "./App.css";

class App extends Component {
  // const cookies = new Cookies();
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: [],
      login: false,
    };

    this.refresh = this.refresh.bind(this);
    // Load All Posts & Current User Using Token
    this.loadData = this.loadData.bind(this);
    // Load All Posts
    this.loadPosts = this.loadData.bind(this);
    // Update Current User
    this.loadUser = this.loadUser.bind(this);
  }

  // Check if the user logged in
  async componentDidMount() {
    const { cookies } = this.props;

    if (cookies.get("jwt") && !this.props.user) {
      await this.loadData();
    }
  }

  // Load All Posts & Current User Using Token
  async loadData() {
    try {
      const { cookies } = this.props;
      const token = cookies.get("jwt");
      const decoded = jwt_decode(token);

      // Load All Posts
      const posts = await axios.get(`${config.SERVER_URL}/api/v1/posts`, {
        withCredentials: true,
        headers: {
          authorization: token,
        },
      });

      // Load Current User
      const currentUser = await axios.get(
        `${config.SERVER_URL}/api/v1/users/id/${decoded.id}`,
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );

      this.setState({
        user: currentUser.data.data.user,
        posts: posts.data.data.posts,
        login: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Load User after updated e.g. avator, name, info, followings
  async loadUser() {
    try {
      const { cookies } = this.props;
      const token = cookies.get("jwt");
      const decoded = jwt_decode(token);

      const updatedUser = await axios.get(
        `${config.SERVER_URL}/api/v1/users/id/${decoded.id}`,
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );
      console.log(updatedUser);

      this.setState({
        user: updatedUser.data.data.user,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Load All Posts
  async loadPosts() {
    try {
      const { cookies } = this.props;
      const token = cookies.get("jwt");

      const posts = await axios.get(`${config.SERVER_URL}/api/v1/posts`, {
        withCredentials: true,
        headers: {
          authorization: token,
        },
      });

      this.setState({
        posts: posts.data.data.posts,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Login
  async refresh(result) {
    try {
      if (result.data.user && result.token) {
        const { cookies } = this.props;
        cookies.set("jwt", result.token, { path: "/" });

        const posts = await axios.get(`${config.SERVER_URL}/api/v1/posts`, {
          withCredentials: true,
          headers: {
            authorization: result.token,
          },
        });

        this.setState({
          user: result.data.user,
          posts: posts.data.data.posts,
          login: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate() {
    console.log("update");
    console.log(this.state.user);
  }

  render() {
    const { login } = this.state;

    return (
      <div className="App">
        <Navigation
          user={this.state.user}
          loadPosts={this.loadPosts}
          loadUser={this.loadUser}
          cookies={this.props.cookies}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) =>
              login ? (
                <Redirect to="/home" />
              ) : (
                <Main refresh={this.refresh} {...routeProps} />
              )
            }
          />
          <Route
            exact
            path="/home"
            render={(routeProps) =>
              !login ? (
                <Redirect to="/" />
              ) : (
                <Home
                  posts={this.state.posts}
                  user={this.state.user}
                  cookies={this.props.cookies}
                  {...routeProps}
                />
              )
            }
          />
          <Route
            exact
            path="/:name"
            render={(routeProps) => (
              <Profile
                user={this.state.user}
                cookies={this.props.cookies}
                {...routeProps}
                loadUser={this.loadUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
