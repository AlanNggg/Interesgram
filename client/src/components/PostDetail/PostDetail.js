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
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import Comments from "../Comments/Comments";
import { createComment } from "../../redux/actions/comments";
import { getPost } from "../../redux/actions/posts";
import { connect } from "react-redux";
import axios from "axios";
import config from "../../config";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      isFavorite: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    const { postId } = this.props.match.params;
    await this.props.getPost(postId);

    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${postId}/favorites/favoriteOrNot`
    );

    const { isFavorite } = res.data.data;
    this.setState({ isFavorite });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const newComment = {
      post: this.props.selectedPost.id,
      comment: this.state.comment,
    };
    this.props.createComment(newComment);

    this.setState({ comment: "" });
  }

  async handleFavorite(evt) {
    evt.preventDefault();
    const { isFavorite } = this.state;
    const { selectedPost } = this.props;

    try {
      if (!isFavorite) {
        await axios.post(`${config.SERVER_URL}/api/v1/favorites`, {
          post: selectedPost.id,
        });

        this.setState({ isFavorite: true });
      } else {
        await axios.delete(`${config.SERVER_URL}/api/v1/favorites`, {
          data: {
            post: selectedPost.id,
          },
        });

        this.setState({ isFavorite: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { selectedPost } = this.props;

    const { comment, isFavorite } = this.state;

    return (
      selectedPost && (
        <div className="PostDetail">
          <Container>
            <Card>
              <Card.Body>
                <Row xs={1}>
                  {selectedPost.images.length > 0 && (
                    <Col lg={7}>
                      <Carousel>
                        {selectedPost.images.map((image) => {
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
                  <Col xs lg={selectedPost.images.length > 0 && 5}>
                    <Nav.Link
                      as={Link}
                      to={`/${selectedPost.author.name}`}
                      className="px-0"
                    >
                      <Card.Title className="text-sm-left">
                        <img
                          src={`/img/users/${selectedPost.author.avator}`}
                          className="Post-avatar"
                        />
                        {selectedPost.author.name}
                      </Card.Title>
                    </Nav.Link>

                    <Card.Text className="text-sm-left">
                      {selectedPost.description}
                    </Card.Text>
                    <Card.Text className="post-icons text-sm-left">
                      <Nav.Link
                        className="px-0 mr-3 text-dark"
                        onClick={this.handleFavorite}
                      >
                        <FontAwesomeIcon
                          icon={isFavorite ? fasHeart : farHeart}
                          size="lg"
                        />
                      </Nav.Link>
                    </Card.Text>

                    <Comments postId={selectedPost.id} />
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
          </Container>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  selectedPost: state.posts.selectedPost,
});

export default connect(mapStateToProps, {
  getPost,
  createComment,
})(PostDetail);
