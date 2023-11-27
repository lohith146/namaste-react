import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar_url: "",
        name: "Dummy",
        location: "Vizag",
      },
    };
    // console.log("UserClass constructor");
  }
  async componentDidMount() {
    // console.log("UserClass componentDidMount");
    const data = await fetch("https://api.github.com/users/lohith146");
    const res = await data.json();
    this.setState({ user: res });
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    // console.log("UserClass render");
    const { avatar_url, name, location } = this.state.user;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: lohith@gmail.com</h4>
      </div>
    );
  }
}
export default UserClass;
