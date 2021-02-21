import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Thumbnail from "../Thumbnail/Thumbnail";
import { getFavorites, getPostsFromUser } from "../../redux/actions/posts";
import { connect } from "react-redux";

class Thumbnails extends Component {
  componentDidMount() {
    if (this.props.tab === "posts") {
      this.props.getPostsFromUser(this.props.selectedUser.id);
    } else if (this.props.tab === "favorites") {
      this.props.getFavorites(this.props.selectedUser.id);
    }
    console.log(this.props.selectedUser.name);
  }
  render() {
    const { tab, posts, favorites } = this.props;

    return tab === "posts"
      ? posts.map((post) => (
          <Col key={post.id} xs={12} className="my-3">
            <Link className="text-dark" to={`/post/${post.id}`}>
              <Thumbnail post={post} />
            </Link>
          </Col>
        ))
      : favorites.map((favorite) => (
          <Col key={favorite.post.id} xs={12} className="my-3">
            <Link className="text-dark" to={`/post/${favorite.post.id}`}>
              <Thumbnail post={favorite.post} />
            </Link>
          </Col>
        ));
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  selectedUser: state.users.selectedUser,
  favorites: state.posts.favorites,
});

export default connect(mapStateToProps, { getPostsFromUser, getFavorites })(
  Thumbnails
);
