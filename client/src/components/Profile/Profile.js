import React, { Component } from "react";
import { Row, Col, Button, Modal, Card, Tabs, Tab } from "react-bootstrap";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import Thumbnails from "../Thumbnails/Thumbnails";
import "./Profile.css";
import { getUserByUsername } from "../../redux/actions/users";
import { getCurrentUser } from "../../redux/actions/auth";
import {
  getFollowings,
  getFollowers,
  addFollower,
  removeFollower,
} from "../../redux/actions/follows";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allowEdit: false,
      isFollowing: false,
      show: false,
      isLoading: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
    console.log("Mount");
    console.log(this.props.selectedUser);
    this.setState({ isLoading: true }, this.fetchProfile);
    console.log(this.state.isLoading);
  }

  async fetchProfile() {
    console.log("fetchProfile");
    const { name } = this.props.match.params;
    await this.props.getUserByUsername(name);

    if (!this.props.auth.user) await this.props.getCurrentUser();

    if (this.props.selectedUser && this.props.auth.user) {
      // if current user selects himself/herself
      if (this.props.selectedUser.id === this.props.auth.user.id) {
        this.setState({
          // allow him/her to edit profile
          allowEdit: true,
          isLoading: false,
        });
      } else {
        // get selected user's followers and followings
        await this.props.getFollowings(this.props.selectedUser.id);
        await this.props.getFollowers(this.props.selectedUser.id);

        // check if current user is following selected user
        let isFollowing = false;
        const follow = this.props.follows.followers.find(
          (follower) =>
            // if select user has a follower with id == current user id
            follower.follower.id === this.props.auth.user.id
        );

        if (follow) {
          isFollowing = true;
        }

        this.setState({
          // set current user is following selected user or not
          allowEdit: false,
          isFollowing,
          isLoading: false,
        });
      }
    }
  }

  handleClick() {
    this.setState((st) => ({ show: !st.show }));
  }

  async handleFollow() {
    const { name } = this.props.match.params;
    const { isFollowing } = this.state;

    // if current user is NOT following selected user
    if (!isFollowing) {
      // add to selected user's followers
      await this.props.addFollower(this.props.selectedUser.id);

      // get followers of selected user and POPULATE the followers'data
      await this.props.getFollowers(this.props.selectedUser.id);

      this.setState((st) => ({
        // set current user is following selected user
        isFollowing: true,
      }));
    } else {
      // find the follow id if current user has followed selected user
      const follow = this.props.follows.followers.find(
        (follower) => follower.follower.id === this.props.auth.user.id
      );

      // if current user has followed selected user
      if (follow) {
        // remove current user from selected user's followers
        await this.props.removeFollower(follow.id);
      }

      this.setState((st) => ({
        // set current user is NOT following selected user
        isFollowing: false,
      }));
    }

    // get new current user's data
    await this.props.getCurrentUser();
    // get new selected user's data
    await this.props.getUserByUsername(name);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedUser.id !== prevProps.selectedUser.id) {
      console.log("Update: different user");
      // this.fetchProfile();
    }
  }

  render() {
    const { allowEdit, isFollowing, show, isLoading } = this.state;

    console.log(isLoading, this.props.selectedUser, this.props.auth);

    return (
      <div className="Profile">
        <Card>
          <Card.Body>
            <Row>
              <Col xs={3}>
                <img
                  className="Profile-avator"
                  src={`/img/users/${this.props.selectedUser.avator}`}
                />
              </Col>
              <Col xs={9}>
                <Row>
                  <Col xs={12} className="mt-3">
                    <div className="Profile-username mb-3 mr-4">
                      {this.props.selectedUser.name}
                    </div>
                    {allowEdit ? (
                      <Button
                        variant="outline-primary"
                        className="Profile-btn"
                        onClick={this.handleClick}
                        block
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        variant="outline-primary"
                        className="Profile-btn"
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
                  <Col xs={12} className="mt-3">
                    <Card.Text className="text-sm-left">
                      {this.props.selectedUser.info}
                    </Card.Text>
                  </Col>
                  <Col xs={12} className="mt-3">
                    <Row>
                      <Col>Posts {this.props.selectedUser.numPosts}</Col>
                      <Col>
                        Followers {this.props.selectedUser.numFollowers}
                      </Col>
                      <Col>
                        Following {this.props.selectedUser.numFollowings}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Tabs defaultActiveKey="posts" className="nav-fill">
          <Tab eventKey="posts" title="posts">
            <Row md={3} className="Profile-thumbnails">
              <Thumbnails tab="posts" />
            </Row>
          </Tab>
          <Tab eventKey="favorites" title="favorites">
            <Row md={3} className="Profile-thumbnails">
              <Thumbnails tab="favorites" />
            </Row>
          </Tab>
        </Tabs>
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
  getCurrentUser,
  getUserByUsername,
  getFollowings,
  getFollowers,
  addFollower,
  removeFollower,
})(Profile);
