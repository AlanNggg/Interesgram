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
import config from "../config";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const { id, cookies } = this.props;

      const result = await axios.get(
        `${config.SERVER_URL}/api/v1/comments?post=${id}`,
        {
          withCredentials: true,
          headers: {
            authorization: cookies.get("jwt"),
          },
        }
      );

      this.setState({
        comments: result.data.data.comments,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const { id, user, cookies } = this.props;

      const { comment } = this.state;
      const result = await axios.post(
        `${config.SERVER_URL}/api/v1/comments`,
        {
          user: user._id,
          post: id,
          comment,
        },
        {
          withCredentials: true,
          headers: {
            authorization: cookies.get("jwt"),
          },
        }
      );

      this.setState((st) => ({
        comments: [...st.comments, result.data.data.comment],
        comment: "",
      }));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { id, author, images, description, createdAt, cookies } = this.props;

    const { comment, comments } = this.state;

    return (
      <div className="PostDetail">
        <Card>
          <Card.Body>
            <Row xs={1}>
              {images.length > 0 && (
                <Col lg={7}>
                  <Carousel>
                    {images.map((image) => {
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
              <Col xs lg={images.length > 0 && 5}>
                <Nav.Link as={Link} to={`/${author.name}`} className="px-0">
                  <Card.Title className="text-sm-left">
                    <img
                      src={`/img/users/${author.avator}`}
                      className="Post-avatar"
                    />
                    {author.name}
                  </Card.Title>
                </Nav.Link>

                <Card.Text className="text-sm-left">{description}</Card.Text>
                <Card.Text className="post-icons text-sm-left">
                  <a href="/" className="mr-3">
                    <FontAwesomeIcon icon={farHeart} size="lg" />
                  </a>
                </Card.Text>

                <Comments comments={comments} />
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

export default PostDetail;
