import React, { Component } from "react";
import { Card, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons";
import "./SearchList.css";
import config from "../../config";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/users";

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUsers(this.props.name);
  }
  render() {
    const { users } = this.props;

    return (
      <div className="SearchList">
        <Card>
          <Card.Body>
            {users &&
              users.map((user) => (
                <Nav.Link
                  key={user.id}
                  as={Link}
                  to={`/${user.name}`}
                  className="px-0"
                >
                  <Card.Title className="text-sm-left">
                    <img
                      src={`/img/users/${user.avator}`}
                      className="SearchList-avatar"
                    />
                    {user.name}
                  </Card.Title>
                </Nav.Link>
              ))}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users.users,
});

export default connect(mapStateToProps, {
  getUsers,
})(SearchList);
