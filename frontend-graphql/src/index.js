import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./Store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/",
  cache: new InMemoryCache(),
  name: "E-commerceSite",
  version: "1.0"
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <HelmetProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </HelmetProvider>
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
