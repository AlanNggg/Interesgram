import React, { Component } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./UpdateProfile.css";
import config from "../config";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      info: props.info,
      avator: props.avator,
      newAvatorPreview: null,
      newAvator: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async handleSubmit(evt) {
    evt.preventDefault();
    const { name, info, newAvator } = this.state;
    const { save } = this.props;

    console.log(newAvator);
    const form = new FormData();
    form.append("name", name);
    form.append("info", info);
    if (newAvator) form.append("avator", newAvator);

    save(form);
  }

  // Give Image Preview
  handleFileChange(evt) {
    if (evt.target.files) {
      const file = URL.createObjectURL(evt.target.files[0]);
      this.setState({ newAvatorPreview: file, newAvator: evt.target.files[0] });
      console.log(evt.target.files[0]);
      // URL.revokeObjectURL(file);
    }
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  render() {
    const { name, info, avator, newAvator, newAvatorPreview } = this.state;
    const preview = newAvator ? (
      <img
        className="UpdateProfile-avator"
        src={newAvatorPreview}
        alt="User photo"
      />
    ) : (
      <img className="UpdateProfile-avator" src={avator} alt="User photo" />
    );
    return (
      <div className="UpdateProfile">
        <Form encType="multipart/form-data">
          <Row>
            <Col>
              <Card>
                <Card.Body>{preview}</Card.Body>
              </Card>
            </Col>
            <Col>
              <Form.Group className="d-flex align-items-middle">
                <Form.File
                  name="avator"
                  type="file"
                  accept="image/*"
                  label="Choose new photo"
                  onChange={this.handleFileChange}
                  custom
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="info"
                  placeholder="Your Description"
                  value={info}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="outline-primary"
                type="submit"
                onClick={this.handleSubmit}
                block
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default UpdateProfile;
