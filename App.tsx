import Navigation from "./navigation/Navigation";
import { Provider } from "react-redux";
import store from "./redux/store"; // Make sure the path is correct

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
