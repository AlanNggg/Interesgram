import React, { Component } from "react";
import { Container, Card, Nav, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import "./Comment.css";
import config from "../config";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {}

  render() {
    const { user, comment } = this.props;

    return (
      <div className="Comment">
        <Card className="border-top-0 border-left-0 border-right-0">
          <Card.Body className="px-0 py-2">
            <Row>
              <Col xs={2}>
                <Nav.Link as={Link} to={`/${user.name}`}>
                  <img
                    src={`/img/users/${user.avator}`}
                    className="Comment-avatar"
                  />
                </Nav.Link>
              </Col>

              <Col xs={9}>
                <Nav.Link as={Link} to={`/${user.name}`} className="px-0 pt-1">
                  <Card.Title className="text-sm-left m-0">
                    {user.name}
                  </Card.Title>
                </Nav.Link>
                <Card.Text className="text-sm-left">{comment}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Comment;
