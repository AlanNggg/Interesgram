import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import "./Main.css";

const cookies = new Cookies();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveAccount: false,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleSwitch() {
    this.setState((st) => ({ haveAccount: !st.haveAccount }));
  }

  render() {
    const { haveAccount } = this.state;
    const { refresh } = this.props;
    return (
      <div className="Main">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={5} lg={4}>
              {haveAccount ? (
                <Login refresh={refresh} />
              ) : (
                <SignUp refresh={refresh} />
              )}
              <Button
                className="LoginSection-switch-btn"
                variant="link"
                size="sm"
                onClick={this.handleSwitch}
              >
                If already have account, click here
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;
