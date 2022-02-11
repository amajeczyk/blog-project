import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "../style/BlogView.css";

function BlogView(props) {
  let { id } = useParams();
  const [blog, setBlog] = useState({});

  let getBlog = async () => {
    const result = await fetch(`http://localhost:3001/blog/${id}`, {
      method: "GET",
    }).then((res) => res.json());

    if (result.status === "ok") {
      setBlog(result.data.pop());
    }
  };

  useEffect(() => {
    getBlog();
    console.log("hello1");
  }, []);

  console.log(blog);
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
          <button className="button-38">Up vote</button>
        </div>
      </div>
    </>
  );
}

export default BlogView;
