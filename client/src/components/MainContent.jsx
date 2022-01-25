import React from "react";
import BlogElement from "./BlogElement";
import "../style/MainContent.css";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = { blogs: [] };
    this.fetchArticels();
  }

  fetchArticels = async () => {
    const result = await fetch("http://localhost:3001/articels/main", {
      method: "GET",
    }).then((res) => res.json());

    if (result.status === "ok") {
      this.setState({ blogs: result.data });
      return;
    } else {
      //dispaly somethingi if data cannot be fetched
    }
  };

  componentDidMount() {
    console.log("component did mount");
  }

  render() {
    const { blogs } = this.state;
    return (
      <div className="main-content-wrapper">
        <h1 className="blog-info"> There are some blogs to read</h1>
        <hr />
        {blogs.map((blogElement) => {
          console.log("MainContent passing", blogElement);
          return blogElement ? (
            <div key={blogElement.id}>
              <BlogElement dataFromParent={blogElement} />
              <hr />
            </div>
          ) : (
            <div>loading data...</div>
          );
        })}
        <div className="load-more-wrapper">Click to load more blogs</div>
      </div>
    );
  }
}

export default MainContent;
