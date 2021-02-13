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
import { connect } from "react-redux";
import { getFollowings, getFollowers } from "../../redux/actions/follows";

class FollowList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getFollowings();
    this.props.getFollowers();
  }
  render() {
    const { followings, followers, typeOfList } = this.props;
    return (
      <div className="FollowList">
        <Card>
          <Card.Body>
            {typeOfList === "followings"
              ? followings.length > 0 &&
                followings.map((following) => (
                  <Nav.Link
                    as={Link}
                    to={`/${following.name}`}
                    className="px-0"
                  >
                    <Card.Title className="text-sm-left">
                      <img
                        src={`/img/users/${following.avator}`}
                        className="FollowList-avatar"
                      />
                      {following.name}
                    </Card.Title>
                  </Nav.Link>
                ))
              : followers.length > 0 &&
                followers.map((follower) => (
                  <Nav.Link as={Link} to={`/${follower.name}`} className="px-0">
                    <Card.Title className="text-sm-left">
                      <img
                        src={`/img/users/${follower.avator}`}
                        className="FollowList-avatar"
                      />
                      {follower.name}
                    </Card.Title>
                  </Nav.Link>
                ))}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FollowList;

const mapStateToProps = (state) => ({
  followings: state.followings,
  followers: state.followers,
});
export default connect(mapStateToProps, {
  getFollowings,
  getFollowers,
})(FollowList);
