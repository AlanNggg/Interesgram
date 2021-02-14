import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Container,
  Card,
  Carousel,
} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import config from "../../config";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import Thumbnails from "../UpdateProfile/UpdateProfile";

import "./Profile.css";
import { getUserByUsername } from "../../redux/actions/users";
import {
  getFollowings,
  getFollowers,
  addFollowing,
  removeFollowing,
} from "../../redux/actions/follows";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allowEdit: false,
      isFollowing: false,
      show: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
    const { name } = this.props.match.params;
    const {
      auth,
      selectedUser,
      follows,
      getUserByUsername,
      getFollowings,
      getFollowers,
    } = this.props;

    getUserByUsername(name);

    if (selectedUser.id === auth.user.id) {
      this.setState({
        // For checking if current User select himself/herself
        allowEdit: true,
      });
    } else {
      getFollowings(selectedUser.id);
      getFollowers(selectedUser.id);

      let isFollowing = false;
      follows.followers.forEach((follower) => {
        if (follower.follower.id === auth.user.id) isFollowing = true;
      });

      this.setState({
        // For checking if current User select himself/herself
        isFollowing,
      });
    }
  }

  handleClick() {
    this.setState((st) => ({ show: !st.show }));
  }

  handleFollow() {
    const { isFollowing } = this.state;
    const {
      auth,
      selectedUser,
      follows,
      addFollowing,
      removeFollowing,
    } = this.props;

    if (!isFollowing) {
      addFollowing(selectedUser.id);
    } else {
      const follow = follows.followers.find(
        (follower) => follower.follower.id === auth.user.id
      );
      console.log(follow.id);
      removeFollowing(follow.id);
    }
  }

  render() {
    const { selectedUser } = this.props;
    const { allowEdit, isFollowing, show } = this.state;

    return (
      <div className="Profile">
        <Card>
          <Card.Body>
            <Card.Title className="text-sm-left">
              <Row>
                <Col xs={3}>
                  {/* <img
                    className="Profile-avator"
                    src={`/img/users/${selectedUser.avator}`}
                  /> */}
                </Col>
                <Col>
                  {/* <div className="my-3">{selectedUser.name}</div> */}
                  {allowEdit ? (
                    <Button
                      variant="outline-primary"
                      onClick={this.handleClick}
                      block
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      onClick={this.handleFollow}
                      block
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                  )}

                  <Modal
                    show={show}
                    dialogClassName="Profile-modal"
                    onHide={this.handleClick}
                  >
                    <Modal.Header className="py-2" closeButton>
                      <Modal.Title>Your Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="py-3">
                      <UpdateProfile />
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Card.Title>
            <Card.Text className="text-sm-left my-4">
              {/* {selectedUser.info} */}
            </Card.Text>

            <Row>
              {/* <Col>Posts {selectedUser.numPosts}</Col>
              <Col>Followers {selectedUser.numFollowers}</Col>
              <Col>Following {selectedUser.numFollowings}</Col> */}
            </Row>
          </Card.Body>
        </Card>
        <Row md={3} className="Profile-thumbnails">
          {/* <Thumbnails userId={selectedUser.id} /> */}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  selectedUser: state.users.selectedUser,
  follows: state.follows,
});

export default connect(mapStateToProps, {
  getUserByUsername,
  getFollowings,
  getFollowers,
  addFollowing,
  removeFollowing,
})(Profile);
