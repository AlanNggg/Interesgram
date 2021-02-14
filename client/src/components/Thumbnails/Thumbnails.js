import React, { Component } from "react";
import { Col } from "react-bootstrap";
import Thumbnail from "../Thumbnail/Thumbnail";
import { getPostsFromUser } from "../../redux/actions/posts";
import { connect } from "react-redux";

class Thumbnails extends Component {
  componentDidMount() {
    this.props.getPostsFromUser(this.props.userId);
  }
  render() {
    const { posts } = this.props;
    return (
      <div className="Thumbnails">
        {posts.map((post) => (
          <Col key={post.id} xs={12} className="my-3">
            <Thumbnail post={post} />
          </Col>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPostsFromUser })(Thumbnails);
