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
import Thumbnail from "../Thumbnail/Thumbnail";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      avator: "",
      info: "",
      email: "",
      allowEdit: false,
      numPosts: 0,
      followers: [],
      following: [],
      show: false,
      posts: [],
      isFollowing: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.save = this.save.bind(this);
    this.loadSelectedUser = this.loadSelectedUser.bind(this);
    this.loadSelectedUserByJWT = this.loadSelectedUserByJWT.bind(this);
  }

  async componentDidMount() {
    if (!this.props.user && !this.props.cookies.get("jwt"))
      this.props.history.push("/");

    if (this.props.user) await this.loadSelectedUser();
    else await this.loadSelectedUserByJWT();
  }

  // Load a User Profile if current user logged in
  async loadSelectedUser() {
    try {
      const { user, cookies } = this.props;
      const { name } = this.props.match.params;

      const result = await axios.get(
        `${config.SERVER_URL}/api/v1/users/${name}`,
        {
          withCredentials: true,
          headers: {
            authorization: cookies.get("jwt"),
          },
        }
      );
      const {
        id,
        avator,
        info,
        email,
        followers,
        following,
        posts,
      } = result.data.data.user;

      // Check if current user follows the selected user
      let isFollowing = false;

      user.following.forEach((el) => {
        if (el.following === id) isFollowing = true;
      });

      this.setState({
        id,
        name,
        avator,
        info,
        email,
        followers,
        following,
        posts,
        isFollowing,
        // For checking if current User select himself/herself
        allowEdit: name === user.name,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // // Load a User Profile if current user logged in
  async loadSelectedUserByJWT() {
    try {
      const { cookies } = this.props;
      const decoded = jwt_decode(cookies.get("jwt"));
      const { name } = this.props.match.params;

      const result = await axios.get(
        `${config.SERVER_URL}/api/v1/users/${name}`,
        {
          withCredentials: true,
          headers: {
            authorization: cookies.get("jwt"),
          },
        }
      );
      const {
        id,
        avator,
        info,
        email,
        following,
        followers,
        posts,
      } = result.data.data.user;

      // Check if current user follows the selected user
      let isFollowing = false;

      followers.forEach((el) => {
        if (el.follower === decoded.id) isFollowing = true;
      });

      this.setState({
        name,
        avator,
        info,
        email,
        following,
        followers,
        posts,
        isFollowing,
        // For checking if current User select himself/herself
        allowEdit: id === decoded.id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleClick() {
    this.setState((st) => ({ show: !st.show }));
  }

  async handleFollow() {
    try {
      const { user, cookies } = this.props;
      const { id, followers, isFollowing } = this.state;
      const token = cookies.get("jwt");

      if (!isFollowing) {
        const result = await axios.post(
          `${config.SERVER_URL}/api/v1/follows`,
          {
            follower: user._id,
            following: id,
          },
          {
            withCredentials: true,
            headers: {
              authorization: token,
            },
          }
        );

        this.setState((st) => {
          return {
            isFollowing: true,
            followers: [...st.followers, result.data.data.follow],
          };
        });
      } else {
        const follow = followers.find(
          (follower) => follower.follower === user._id
        );

        const result = await axios.delete(
          `${config.SERVER_URL}/api/v1/follows/${follow._id}`,
          {
            withCredentials: true,
            headers: {
              authorization: token,
            },
          }
        );

        this.setState((st) => ({
          isFollowing: false,
          followers: st.followers.filter(
            (follower) => follower._id !== follow._id
          ),
        }));
      }

      await this.props.loadUser();
    } catch (err) {
      console.log(err);
    }
  }

  // Update User: avator, name, info
  async save(form) {
    try {
      const { cookies } = this.props;
      const token = cookies.get("jwt");
      const result = await axios.patch(
        `${config.SERVER_URL}/api/v1/users/update`,
        form,
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );
      const { name, avator, info } = result.data.data.user;
      this.setState({ name, avator, info });

      // Update Current User State in App/root
      this.props.loadUser();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    // Selected User Info
    const {
      id,
      name,
      avator,
      info,
      email,
      isFollowing,
      allowEdit,
      followers,
      following,
      posts,
      show,
    } = this.state;

    // Current User, JWT
    const { user, cookies } = this.props;
    console.log(user);

    let author;
    if (user._id == id) {
      author = user;
    } else {
      author = {
        avator,
        info,
        _id: id,
        name,
        email,
      };
    }

    const thumbnails = posts.map((post) => (
      <Col key={post._id} xs={12} className="my-3">
        <Thumbnail
          user={user}
          id={post._id}
          author={author}
          images={post.images}
          description={post.description}
          createdAt={post.createdAt}
          cookies={cookies}
        />
      </Col>
    ));

    return (
      <div className="Profile">
        <Card>
          <Card.Body>
            <Card.Title className="text-sm-left">
              <Row>
                <Col xs={3}>
                  <img
                    className="Profile-avator"
                    src={`/img/users/${avator}`}
                  />
                </Col>
                <Col>
                  <div className="my-3">{name}</div>
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
            <Card.Text className="text-sm-left my-4">{info}</Card.Text>

            <Row>
              <Col>Posts {posts.length}</Col>
              <Col>Followers {followers.length}</Col>
              <Col>Following {following.length}</Col>
            </Row>
          </Card.Body>
        </Card>
        <Row md={3} className="Profile-thumbnails">
          {thumbnails}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = {
  auth: state.auth,
};
export default Profile;
