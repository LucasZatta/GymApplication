import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import JwtDecode from "jwt-decode";
import { AppProps } from "next/app";
import React from "react";
import { fetchToken, getAccessToken, setAccessToken } from "../auth";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (token === "") return true;
        try {
          const { exp } = JwtDecode(token);
          return Date.now() < exp * 1000;
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => fetchToken(),
      handleFetch: (accessToken) => setAccessToken(accessToken),
      handleError: (err) => console.log("erro ao buscar token ", err),
    }),
    authLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
