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
import Comments from "../Comments/Comments";
import config from "../../config";
import { createComment } from "../../redux/actions/comments";
import { connect } from "react-redux";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const newComment = {
      post: this.props.post.id,
      comment: this.state.comment,
    };
    this.props.createComment(newComment);

    this.setState({ comment: "" });
  }

  render() {
    const { post } = this.props;

    const { comment } = this.state;

    return (
      <div className="PostDetail">
        <Card>
          <Card.Body>
            <Row xs={1}>
              {post.images.length > 0 && (
                <Col lg={7}>
                  <Carousel>
                    {post.images.map((image) => {
                      return (
                        <Carousel.Item key={image}>
                          <img
                            className="d-block w-100"
                            src={`/img/posts/${image}`}
                          />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </Col>
              )}
              <Col xs lg={post.images.length > 0 && 5}>
                <Nav.Link
                  as={Link}
                  to={`/${post.author.name}`}
                  className="px-0"
                >
                  <Card.Title className="text-sm-left">
                    <img
                      src={`/img/users/${post.author.avator}`}
                      className="Post-avatar"
                    />
                    {post.author.name}
                  </Card.Title>
                </Nav.Link>

                <Card.Text className="text-sm-left">
                  {post.description}
                </Card.Text>
                <Card.Text className="post-icons text-sm-left">
                  <a href="/" className="mr-3">
                    <FontAwesomeIcon icon={farHeart} size="lg" />
                  </a>
                </Card.Text>

                <Comments postId={post.id} />
                <Form className="mb-0" inline>
                  <Form.Group className="d-flex flex-row">
                    <Form.Control
                      name="comment"
                      type="text"
                      placeholder="Comment"
                      value={comment}
                      onChange={this.handleChange}
                      className="border-right-0 border-radius-right-0"
                    />
                    <Button
                      variant="outline-primary"
                      type="submit"
                      onClick={this.handleSubmit}
                      className="border-radius-left-0"
                    >
                      Send
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect(null, { createComment })(PostDetail);
