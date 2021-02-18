import React, { Component } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import Posts from "../Posts/Posts";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";

import { CookiesProvider } from "react-cookie";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Home">
        <Container>
          <Row xs={1}>
            <Col md={3}>
              <Sidebar />
            </Col>

            <Col md={9}>
              <Posts />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
