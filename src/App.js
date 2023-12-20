import { Provider } from "react-redux";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import store from "./utils/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;
