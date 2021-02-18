import React, { Component } from "react";
import { Card, Carousel, Nav, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import PostDetail from "../PostDetail/PostDetail";
import "./Post.css";
import axios from "axios";
import config from "../../config";

axios.defaults.withCredentials = true;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async componentDidMount() {
    const { post } = this.props;
    // check current user liked it or not
    const res = await axios.get(
      `${config.SERVER_URL}/api/v1/posts/${post.id}/favorites/favoriteOrNot`
    );
    const { isFavorite } = res.data.data;
    this.setState({ isFavorite });
  }

  async handleFavorite(evt) {
    evt.preventDefault();
    const { isFavorite } = this.state;
    const { post } = this.props;

    try {
      if (!isFavorite) {
        await axios.post(`${config.SERVER_URL}/api/v1/favorites`, {
          post: post.id,
        });

        this.setState({ isFavorite: true });
      } else {
        await axios.delete(`${config.SERVER_URL}/api/v1/favorites`, {
          data: {
            post: post.id,
          },
        });

        this.setState({ isFavorite: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { post } = this.props;
    const { isFavorite } = this.state;

    return (
      <div className="Post">
        <Card>
          <Card.Body>
            <Nav.Link as={Link} to={`/${post.author.name}`} className="px-0">
              <Card.Title className="text-sm-left">
                <img
                  src={`/img/users/${post.author.avator}`}
                  className="Post-avatar"
                />
                {post.author.name}
              </Card.Title>
            </Nav.Link>
            {post.images && (
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
            )}
            <Card.Text
              className={post.images.length > 0 ? "my-3" : "text-sm-left"}
            >
              {post.description}
            </Card.Text>
            <Card.Text className="post-icons text-sm-left">
              <Link
                to="#"
                className="mr-3 text-dark"
                onClick={this.handleFavorite}
              >
                <FontAwesomeIcon
                  icon={isFavorite ? fasHeart : farHeart}
                  size="lg"
                />
              </Link>
              <Link className="mr-3 text-dark" to={`/post/${post.id}`}>
                <FontAwesomeIcon icon={farComment} size="lg" />
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default Post;
