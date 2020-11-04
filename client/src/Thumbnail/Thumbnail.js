import React, { Component } from "react";
import { Container, Card, Carousel, Nav, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";
import config from "../config";
import "./Thumbnail.css";

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShowMore() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
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

    return (
      <div className="Thumbnail">
        <Card onClick={this.handleShowMore}>
          {images.length > 0 && (
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
          <Card.Body>
            <Card.Text>{description}</Card.Text>

            <Card.Text className="post-icons text-sm-left"></Card.Text>
          </Card.Body>
        </Card>
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
      </div>
    );
  }
}

export default Thumbnail;
