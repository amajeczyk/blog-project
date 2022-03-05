import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "../style/BlogView.css";
import { authenticationService } from "../_services/authentication.service";

function BlogView(props) {
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const [authToken] = useState(
    authenticationService.getTokenFromLocalStorage()
  );

  let getBlog = async () => {
    const result = await fetch(
      `https://majerczyk-blog-it.herokuapp.com/blog/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    if (result.status === "ok") {
      setBlog(result.data.pop());
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const upVoteBlog = async () => {
    const result = await fetch(
      `https://majerczyk-blog-it.herokuapp.com/blog/upvote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authToken: authToken }),
      }
    ).then((res) => res.json());

    if (result.message == "Authentication failed") {
      alert("You have to log in to vote");
      return;
    }
    alert(result.message);
  };
  return (
    <>
      <NavBar />
      <div className="main-account-wrapper">
        <div className="blog-view-title">
          {blog.title ? <>{blog.title}</> : <>Blog not found</>}
        </div>
        <div className="blog-view-content">
          {blog.blogText ? blog.blogText : <></>}
        </div>
        <div className="blog-view-footer">
          <button className="button-38" onClick={upVoteBlog}>
            Up vote
          </button>
        </div>
      </div>
    </>
  );
}

export default BlogView;
