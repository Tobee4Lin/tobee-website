import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
