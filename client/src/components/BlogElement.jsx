import React from "react";
import "../style/BlogElement.css";
import { useNavigate } from "react-router-dom";

function BlogElement(props) {
  let navigate = useNavigate();

  const data = props.dataFromParent;
  return (
    <div
      className="blog-element-wrapper"
      onClick={() => {
        navigate(`/blog/${data.id}`);
      }}
    >
      <div className="blog-title">
        <h3>{data.title}</h3>
        {console.log(data.creationDate)}
        <span>{data.creationDate}</span>
      </div>
      <div className="contnet">{data.blogText}</div>
      <div className="blog-footer">
        <span className="author">{"Author: " + data.username}</span>
        <span className="readCount">{data.readCount}</span>
      </div>
    </div>
  );
}

export default BlogElement;
