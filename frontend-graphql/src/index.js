import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./Store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = new createHttpLink({
  uri: "http://localhost:8002/"
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : "";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "E-commerceSite",
  version: "1.0"
});

// const client = new ApolloClient({
//   uri: "http://localhost:8002/",
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo")).token
//       : ""
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </ApolloProvider>
);

reportWebVitals();
