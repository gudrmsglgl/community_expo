import { BASE_URL } from "@/api/axios";
import { getAccessToken } from "@/utils/secureStore";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { SetContextLink } from "@apollo/client/link/context";
import { Platform } from "react-native";

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink = new SetContextLink(async (prevContext) => {
  const accessToken = await getAccessToken();

  return {
    headers: {
      ...prevContext.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  devtools: {
    enabled: __DEV__,
    name: "community",
  },
});

if (__DEV__) {
  const devtoolsHost =
    Platform.OS === "android" ? "172.30.1.16" : "localhost";

  connectApolloClientToVSCodeDevTools(
    apolloClient,
    `ws://${devtoolsHost}:7095`,
  );
}

export default apolloClient;
