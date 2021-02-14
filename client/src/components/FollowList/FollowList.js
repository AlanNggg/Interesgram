import React, { Component } from "react";
import { Card, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import "./FollowList.css";
import config from "../../config";
import { connect } from "react-redux";
import { getFollowings, getFollowers } from "../../redux/actions/follows";

class FollowList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getFollowings(this.props.auth.user.id);
    this.props.getFollowers(this.props.auth.user.id);
  }
  render() {
    const { follows, typeOfList } = this.props;
    console.log(follows);
    return (
      <div className="FollowList">
        <Card>
          <Card.Body>
            {typeOfList === "followings"
              ? follows &&
                follows.followings.map((following) => (
                  <Nav.Link
                    key={following.following.id}
                    as={Link}
                    to={`/${following.following.name}`}
                    className="px-0"
                  >
                    <Card.Title className="text-sm-left">
                      <img
                        src={`${config.SERVER_URL}/img/users/${following.following.avator}`}
                        className="FollowList-avatar"
                      />
                      {following.following.name}
                    </Card.Title>
                  </Nav.Link>
                ))
              : follows &&
                follows.followers.map((follower) => (
                  <Nav.Link
                    key={follower.follower.id}
                    as={Link}
                    to={`/${follower.follower.name}`}
                    className="px-0"
                  >
                    <Card.Title className="text-sm-left">
                      <img
                        src={`${config.SERVER_URL}/img/users/${follower.follower.avator}`}
                        className="FollowList-avatar"
                      />
                      {follower.follower.name}
                    </Card.Title>
                  </Nav.Link>
                ))}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  follows: state.follows,
});

export default connect(mapStateToProps, {
  getFollowings,
  getFollowers,
})(FollowList);
