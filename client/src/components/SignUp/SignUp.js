import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "./SignUp.css";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password, passwordConfirm } = this.state;
    const newUser = {
      name,
      email,
      password,
      passwordConfirm,
    };
    this.props.signUp(newUser);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  render() {
    const { messages } = this.props;
    const { isLoading, isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="SignUp">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={5} lg={4}>
              {messages && <Message variant="danger">{messages}</Message>}
              {isLoading && <Loader />}
              <Form>
                <Form.Group>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.passwordConfirm}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                  block
                >
                  Sign Up
                </Button>
              </Form>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages,
});
export default connect(mapStateToProps, { signUp })(SignUp);
