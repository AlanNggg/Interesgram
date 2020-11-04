import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Posts from "../Posts/Posts";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";
import config from "../config";
const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user) this.props.history.push("/");
  }

  componentDidUpdate() {
    if (!this.props.user) this.props.history.push("/");
  }
  render() {
    const { user, posts } = this.props;
    console.log(posts);
    return (
      <div className="Home">
        {!user || !posts ? (
          <Redirect to="/" />
        ) : (
          <Container>
            <Row xs={1}>
              <Col md={3}>
                <Sidebar {...user} cookies={this.props.cookies} />
              </Col>

              <Col md={9}>
                <Posts user={user} posts={posts} cookies={this.props.cookies} />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Home;
