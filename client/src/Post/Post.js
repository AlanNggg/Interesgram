import React, { Component } from "react";
import { Container, Card, Carousel, Nav, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import PostDetail from "../PostDetail/PostDetail";
import config from "../config";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
  }

  handleShowMore() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleAddFavorite(evt) {
    evt.preventDefault();
  }

  render() {
    const {
      user,
      id,
      author,
      images,
      description,
      createdAt,
      cookies,
    } = this.props;
    const { show } = this.state;

    console.log(images);
    return (
      <div className="Post">
        <Card>
          <Card.Body>
            <Nav.Link as={Link} to={`/${author.name}`} className="px-0">
              <Card.Title className="text-sm-left">
                <img
                  src={`/img/users/${author.avator}`}
                  className="Post-avatar"
                />
                {author.name}
              </Card.Title>
            </Nav.Link>
            {images && (
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
            )}
            <Card.Text className={images.length > 0 ? "my-3" : "text-sm-left"}>
              {description}
            </Card.Text>
            <Card.Text className="post-icons text-sm-left">
              <a className="mr-3" onClick={this.handleAddFavorite}>
                <FontAwesomeIcon icon={farHeart} size="lg" />
              </a>
              <a className="mr-3" onClick={this.handleShowMore}>
                <FontAwesomeIcon icon={farComment} size="lg" />
              </a>
              <Modal
                show={show}
                dialogClassName={
                  images.length > 0 ? "Post-modal" : "Post-modal-no-images"
                }
                onHide={this.handleClose}
              >
                <Modal.Header className="py-2" closeButton />
                <Modal.Body className="py-3">
                  <PostDetail
                    id={id}
                    user={user}
                    images={images}
                    author={author}
                    description={description}
                    createdAt={createdAt}
                    cookies={cookies}
                  />
                </Modal.Body>
              </Modal>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Post;
