import React from "react";
import "../style/AddBlog.css";
import { authenticationService } from "../_services/authentication.service";
import NavBar from "./NavBar";

class AddBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      blogtext: "",
      authToken: `${authenticationService.getTokenFromLocalStorage()}`,
    };
  }

  validateFields = () => {
    let validateTitle = /^[a-zA-Z0-9,#._ ]{6,80}$/i;
    let validateBlogText = /^[a-zA-Z0-9,#._ ]{20,5000}$/i;

    if (!validateTitle.test(this.state.title)) {
      alert("Title must have between 6 and 80 charcters");
      return false;
    }
    if (!validateBlogText.test(this.state.blogtext)) {
      alert("Text must have between 20 and 5000 charcters");
      return false;
    }
    return true;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validateFields()) return;
    const result = await fetch("http://localhost:3001/articels/add/blog", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((res) => res.json());

    if (result.status === "ok") {
      alert(result.message);
    } else {
      alert("fail:", result.message);
    }
  };

  //setting state with user input
  handleChange = (event) => {
    const atrributeName = event.target.name;
    this.setState({ [atrributeName]: event.target.value.trim() });
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="main-add-blog">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Write what you want:</label>
              <textarea
                name="blogtext"
                placeholder="Remember, be nice!"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="button">
              Post
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default AddBlog;
