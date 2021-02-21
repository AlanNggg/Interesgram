import React, { Component } from "react";
import { Card, Nav, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import "./Comment.css";

class Comment extends Component {
  render() {
    const { comment } = this.props;

    return (
      comment && (
        <div className="Comment">
          <Card className="border-top-0 border-left-0 border-right-0">
            <Card.Body className="px-0 py-2 d-flex">
              <Nav.Link
                as={Link}
                to={`/${comment.user.name}`}
                className="px-0 pt-1"
              >
                <img
                  src={`/img/users/${comment.user.avator}`}
                  className="Comment-avatar"
                />
              </Nav.Link>
              <div>
                <Nav.Link
                  as={Link}
                  to={`/${comment.user.name}`}
                  className="px-0 pt-2"
                >
                  <Card.Title className="text-sm-left m-0">
                    {comment.user.name}
                  </Card.Title>
                </Nav.Link>
                <Card.Text className="text-sm-left">
                  {comment.comment}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      )
    );
  }
}

export default Comment;
