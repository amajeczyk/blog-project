import React from "react";
import BlogElement from "./BlogElement";
import "../style/MainContent.css";
import { formatDate } from "../helpers/formatDate";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [] };
    this.fetchArticels();
    console.log("CONSTRUCTOR");
  }

  fetchArticels = async () => {
    const result = await fetch("http://localhost:3001/articels/main", {
      method: "GET",
    }).then((res) => res.json());

    if (result.status === "ok") {
      formatDate(result.data);
      this.setState({ blogs: result.data });
      return;
    } else {
      //dispaly somethingi if data cannot be fetched
    }
  };

  fetchNewArticels = async () => {
    const result = await fetch("http://localhost:3001/articels/get/new/blogs", {
      method: "GET",
      headers: {
        blogsalreadydisplayed: this.state.blogs.map((elem) => elem.id),
      },
    }).then((res) => res.json());

    formatDate(result.data);
    let blogs1 = [];
    blogs1.push(...this.state.blogs);
    blogs1.push(...result.data);
    this.setState({ blogs: blogs1 });
  };

  render() {
    const { blogs } = this.state;
    return (
      <div className="main-content-wrapper">
        <h1 className="blog-info"> There are some blogs to read</h1>
        <hr />
        {blogs.map((blogElement) => {
          //console.log("MainContent passing", blogElement);
          return blogElement ? (
            <div key={blogElement.id}>
              <BlogElement dataFromParent={blogElement} />
              <hr />
            </div>
          ) : (
            <div>loading data...</div>
          );
        })}
        {
          <div className="load-more-wrapper" onClick={this.fetchNewArticels}>
            Click to load more blogs
          </div>
        }
      </div>
    );
  }
}

export default MainContent;
