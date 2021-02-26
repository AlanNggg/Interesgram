import React, { Component } from "react";
import { Container, Nav, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import FollowList from "../FollowList/FollowList";
import "./Sidebar.css";
import config from "../../config";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

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

  logout() {
    this.props.logout();
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSearch(evt) {
    evt.preventDefault();
  }

  handleShowMore(typeOfList) {
    this.setState({ show: true, typeOfList });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const { user } = this.props.auth;

    const { show, typeOfList } = this.state;
    return (
      <div className="Sidebar px-3">
        <img
          className="Sidebar-avator"
          src={`${config.SERVER_URL}/img/users/${user.avator}`}
          alt="User photo"
        />
        <h2>{user.name}</h2>
        <Row md className="py-2 border-bottom">
          <Col lg>
            <h4>{user.numPosts}</h4>
            <span>Posts</span>
          </Col>

          <Col lg onClick={() => this.handleShowMore("followers")}>
            <h4>{user.numFollowers}</h4>
            <span>Followers</span>
          </Col>

          <Col lg onClick={() => this.handleShowMore("followings")}>
            <h4>{user.numFollowings}</h4>
            <span>Following</span>
          </Col>
        </Row>

        <Nav.Link as={Link} to="/" className="px-0">
          Home
        </Nav.Link>

        <Nav.Link as={Link} to="/discover" className="px-0">
          Discover
        </Nav.Link>

        <Nav.Link as={Link} to={`/profile/${user.name}`} className="px-0">
          Profile
        </Nav.Link>

        <Nav.Link onClick={this.logout} className="px-0">
          Logout
        </Nav.Link>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header className="py-2" closeButton />
          <Modal.Body className="py-3">
            <FollowList typeOfList={typeOfList} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  logout,
})(Sidebar);
