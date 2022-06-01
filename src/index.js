import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import App from "./App";
import store from './redux/store';


ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
