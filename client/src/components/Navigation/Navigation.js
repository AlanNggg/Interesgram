import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera as farCamera } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
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
import SearchList from "../SearchList/SearchList";
import "./Navigation.css";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/users";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: false,
      searchShow: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchShow = this.handleSearchShow.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
  }
  handleClick() {
    this.setState((st) => ({ show: !st.show }));
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSearchShow(evt) {
    evt.preventDefault();
    this.setState({ searchShow: true });
  }
  handleSearchClose() {
    this.setState({ searchShow: false });
  }
  render() {
    const { name, show, searchShow } = this.state;
    const { auth } = this.props;

    return (
      <Navbar className="border-bottom" sticky="top" bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Interesgram
          </Navbar.Brand>
          {auth.isAuthenticated && (
            <Fragment>
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
                        onClick={this.handleSearchShow}
                      >
                        Search
                      </Button>
                    </Form>
                    <Modal show={searchShow} onHide={this.handleSearchClose}>
                      <Modal.Header className="py-2" closeButton />
                      <Modal.Body className="py-3">
                        <SearchList name={name} />
                      </Modal.Body>
                    </Modal>
                  </Nav.Item>
                  <Nav.Item className="nav-inline-block">
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
                        <CreatePost />
                      </Modal.Body>
                    </Modal>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Fragment>
          )}
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users.users,
});
export default connect(mapStateToProps, { getUsers })(Navigation);
