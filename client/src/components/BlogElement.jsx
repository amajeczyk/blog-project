import React from "react";
import "../style/BlogElement.css";

class BlogElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.dataFromParent };
  }

  render() {
    const data = this.state.data;
    return (
      <div className="blog-element-wrapper">
        <div className="blog-title">
          <h3>{data.title}</h3>
          <span>{data.creationDate}</span>
        </div>
        <div className="contnet">{data.blogText}</div>
        <div className="footer">
          <span className="author">{data.author}</span>
          <span className="readCount">{data.readCount}</span>
        </div>
      </div>
    );
  }
}

export default BlogElement;
