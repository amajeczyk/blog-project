import React from "react";
import { authenticationService } from "../_services/authentication.service";
import "../style/Account.css";
import "../style/NavBar.css";
import NavBar from "./NavBar";
import { withRouter } from "../_services/withRouter";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBlogs: [],
      isFetched: false,
      authToken: `${authenticationService.getTokenFromLocalStorage()}`,
    };
    this.getUserBlogs();
  }

  getUserBlogs = async () => {
    const result = await fetch(
      `http://localhost:3001/articels/get/user/blogs`,
      {
        method: "GET",
        headers: { authToken: this.state.authToken },
      }
    ).then((res) => res.json());

    console.log("status", result.status);
    if (result.status === "ok") {
      this.setState({ userBlogs: result.data });
      return;
    } else {
      //dispaly somethingi if data cannot be fetched
      console.log("Cannot get user's blogs");
    }
  };

  deleteBlog = async (event) => {
    const blogId = event.target.getAttribute("blogid");
    event.stopPropagation();

    const result = await fetch(`http://localhost:3001/articels/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId: blogId, authToken: this.state.authToken }),
    }).then((res) => res.json());

    if (result.status === "ok") {
      const userBlogs1 = this.state.userBlogs.filter((elem) => {
        return elem.id != result.blogId;
      });

      this.setState({ userBlogs: userBlogs1 });
      console.log(result.message);
      alert(result.message);
      return;
    }
    console.log(result.message);
    alert(result.message);
  };

  redirectToBlogView = (event) => {
    const id = event.target.getAttribute("id");
    this.props.navigate(`/blog/${id}`);
  };

  render() {
    let user = this.props.user;
    const { userBlogs } = this.state;
    return (
      <>
        <NavBar />
        <div className="main-account-wrapper">
          <h1>Hello {user.username}!</h1>
          <div className="blogs-deletion">
            {userBlogs.length ? (
              <span>Here you can find your blogs</span>
            ) : (
              <span>You haven't created blog yet :(</span>
            )}
            {userBlogs.map((blogElement) => {
              return blogElement ? (
                <div
                  id={blogElement.id}
                  key={blogElement.id}
                  className="user-blog"
                  onClick={this.redirectToBlogView}
                >
                  <div className="blog-title">{blogElement.title}</div>
                  <button
                    className="button-38"
                    blogid={blogElement.id}
                    onClick={this.deleteBlog}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div>loading data...</div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Account);
