import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Modal,
  Container,
  Card,
  Carousel,
} from "react-bootstrap";
import "./CreatePost.css";
import { connect } from "react-redux";
import {
  createPost,
  getPosts,
  getPostsFromUser,
} from "../../redux/actions/posts";
import { getUserByUsername } from "../../redux/actions/users";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      previews: [],
      description: "",
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Create Post
  handleSubmit(evt) {
    evt.preventDefault();

    const { images, description } = this.state;

    const form = new FormData();
    form.append("description", description);
    images.forEach((image) => form.append("images", image));

    form.append("author", this.props.auth.user.id);

    this.props.createPost(form);

    if (this.props.location.pathname === "/") {
      this.props.getPosts();
    } else {
      const name = this.props.location.pathname.split("/")[1];

      this.props.getUserByUsername(name);

      if (this.props.selectedUser.id === this.props.auth.user.id)
        this.props.getPostsFromUser(this.props.selectedUser.id);
    }
  }

  // Give Image Preview
  handleFileChange(evt) {
    if (evt.target.files) {
      const file = URL.createObjectURL(evt.target.files[0]);

      this.setState((st) => ({
        images: [...st.images, evt.target.files[0]],
        previews: [...st.previews, file],
      }));
      // Array.from(evt.target.files).map((file) => URL.revokeObjectURL(file));
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const imagePreviews = this.state.previews.map((preview) => (
      <Carousel.Item key={preview}>
        <img className="CreatePost-img d-block w-100" src={preview} />
      </Carousel.Item>
    ));
    const { cookies } = this.props;
    const { description } = this.state;

    return (
      <div className="CreatePost">
        <Form encType="multipart/form-data">
          <Card>
            <Card.Body>
              <Carousel className="card-block my-3">{imagePreviews}</Carousel>
            </Card.Body>
          </Card>

          <Form.Group className="d-flex align-items-middle">
            <Form.File
              name="images"
              type="file"
              multiple
              accept="image/*"
              label="Choose new photo"
              onChange={this.handleFileChange}
              custom
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              placeholder="Your Description"
              value={description}
              className="w-100"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button
            variant="outline-primary"
            type="submit"
            onClick={this.handleSubmit}
            className="w-50 mr-auto"
          >
            Post
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  selectedUser: state.users.selectedUser,
});
export default connect(mapStateToProps, {
  createPost,
  getPosts,
  getUserByUsername,
  getPostsFromUser,
})(withRouter(CreatePost));
