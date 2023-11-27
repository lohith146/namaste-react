import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("About constructor");
  }
  componentDidMount() {
    console.log("About componentDidMount");
  }
  render() {
    console.log("About render");
    return (
      <div>
        <h1>About</h1>
        <p>Welcome to about us page</p>
        <UserClass
          name={"Lohith"}
          location={"vizag"}
          contact={"lohith@gmail.com"}
        />
      </div>
    );
  }
}

export default About;
