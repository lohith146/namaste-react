const heading = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h4", { id: "heading4" }, "Heading4"),
    React.createElement("h5", { id: "heading5" }, "Heading5"),
  ]),
  React.createElement("div", { id: "child2" }, "I am a child2"),
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
