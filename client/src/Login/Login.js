import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import config from "../config";
import Cookies from "universal-cookie";
const axios = require("axios");

const cookies = new Cookies();

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

    try {
      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }

      const result = await axios.post(
        `${config.SERVER_URL}/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      this.props.refresh(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="Login">
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
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
