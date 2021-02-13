import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera as farCamera } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Modal,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  // componentDidMount() {
  //   if (!this.props.user && !this.props.cookies.get("jwt"))
  //     this.props.history.push("/");
  // }
  handleClick() {
    this.setState((st) => ({ show: !st.show }));
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSearch(evt) {
    evt.preventDefault();
  }
  render() {
    const { name, show } = this.state;
    const { user, cookies, loadPosts, loadUser } = this.props;
    const token = cookies.get("jwt");

    return (
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Interesgram
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="d-flex flex-row justify-content-center w-100 py-2 mr-5">
            <Nav.Item className="mr-3 nav-inline-block">
              <Form inline>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Username"
                  value={name}
                  className="nav-search border-radius-right-0"
                  onChange={this.handleChange}
                />
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="border-radius-left-0"
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Form>
            </Nav.Item>
            <Nav.Item className="mr-3 nav-inline-block">
              <Button onClick={this.handleClick}>
                <FontAwesomeIcon icon={farCamera} size="lg" />
              </Button>
              <Modal
                show={show}
                dialogClassName="Profile-model"
                onHide={this.handleClick}
              >
                <Modal.Header className="py-2" closeButton>
                  <Modal.Title>Create a Post</Modal.Title>
                </Modal.Header>

                <Modal.Body className="py-3">
                  <CreatePost
                    user={user}
                    loadPosts={loadPosts}
                    loadUser={loadUser}
                    cookies={cookies}
                  />
                </Modal.Body>
              </Modal>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
