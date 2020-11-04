import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import config from "../config";

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

  async handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password, passwordConfirm } = this.state;
    try {
      const result = await axios.post(
        `${config.SERVER_URL}/api/v1/users/signup`,
        {
          name,
          email,
          password,
          passwordConfirm,
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
      <div className="SignUp">
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
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
