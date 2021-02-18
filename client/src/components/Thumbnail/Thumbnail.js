import React, { Component } from "react";
import { Card, Carousel } from "react-bootstrap";
import "./Thumbnail.css";

class Thumbnail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="Thumbnail">
        <Card>
          {post.images.length > 0 && (
            <Card.Img src={`/img/posts/${post.images[0]}`} />
          )}
          <Card.Body>
            <Card.Text>{post.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Thumbnail;
