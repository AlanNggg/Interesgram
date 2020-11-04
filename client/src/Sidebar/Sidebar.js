import React, { Component } from "react";
import { Container, Nav, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../config";
import FollowList from "../FollowList/FollowList";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      typeOfList: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSearch(evt) {
    evt.preventDefault();
  }
  logout() {
    const { cookies } = this.props;
    cookies.remove("jwt");
    window.location.href = "/";
  }
  handleShowMore(typeOfList) {
    console.log(typeOfList);
    this.setState({ show: true, typeOfList });
  }
  handleClose() {
    this.setState({ show: false });
  }
  render() {
    const {
      _id,
      avator,
      name,
      posts,
      followers,
      following,
      cookies,
    } = this.props;
    const { show, typeOfList } = this.state;
    return (
      <div className="Sidebar">
        <Container>
          <Row>
            <img
              className="Sidebar-avator"
              src={`${config.SERVER_URL}/img/users/${avator}`}
              alt="User photo"
            />
          </Row>
          <Row>
            <Col>
              <h2>{name}</h2>
            </Col>
          </Row>
          <Row md className="py-2 border-bottom sidebar-info">
            <Col lg>
              <h4>{posts.length}</h4>
              <span>Posts</span>
            </Col>

            <Col lg onClick={() => this.handleShowMore("follower")}>
              <h4>{followers.length}</h4>
              <span>Followers</span>
            </Col>

            <Col lg onClick={() => this.handleShowMore("following")}>
              <h4>{following.length}</h4>
              <span>Following</span>
            </Col>
          </Row>
          <Row>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
          </Row>
          <Row>
            <Nav.Link as={Link} to="/discover">
              Discover
            </Nav.Link>
          </Row>
          <Row>
            <Nav.Link as={Link} to={`/${name}`}>
              Profile
            </Nav.Link>
          </Row>
          <Row>
            <Nav.Link onClick={this.logout}>Logout</Nav.Link>
          </Row>
        </Container>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header className="py-2" closeButton />
          <Modal.Body className="py-3">
            <FollowList id={_id} typeOfList={typeOfList} cookies={cookies} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
