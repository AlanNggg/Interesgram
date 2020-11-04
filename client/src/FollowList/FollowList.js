import React, { Component } from "react";
import {
  Container,
  Card,
  Carousel,
  Nav,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import config from "../config";
import "./FollowList.css";

class FollowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    try {
      const { id, typeOfList, cookies } = this.props;
      console.log(id, typeOfList);
      const token = cookies.get("jwt");
      let usersList;
      if (typeOfList === "following") usersList = "follower";
      else usersList = "following";

      const result = await axios.get(
        `${config.SERVER_URL}/api/v1/follows?${usersList}=${id}`,
        {
          withCredentials: true,
          headers: {
            authorization: token,
          },
        }
      );

      const users = result.data.data.follows;
      this.setState((st) => ({ users: users }));
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { typeOfList } = this.props;
    const { users } = this.state;
    return (
      <div className="FollowList">
        <Card>
          <Card.Body>
            {users.length > 0 &&
              users.map((user) => (
                <Nav.Link
                  as={Link}
                  to={
                    typeOfList === "following"
                      ? `/${user.following.name}`
                      : `/${user.follower.name}`
                  }
                  className="px-0"
                >
                  <Card.Title className="text-sm-left">
                    <img
                      src={
                        typeOfList === "following"
                          ? `/img/users/${user.following.avator}`
                          : `/img/users/${user.follower.avator}`
                      }
                      className="FollowList-avatar"
                    />
                    {typeOfList === "following"
                      ? user.following.name
                      : user.follower.name}
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
