import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import config from "../../config";
import "./Login.css";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = this.state;

    this.props.login(email, password);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="Login">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={5} lg={4}>
              <Form>
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

                <Button
                  variant="outline-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                  block
                >
                  Login
                </Button>
              </Form>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
