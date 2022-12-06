import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayUsers from "./users/DisplayUsers";
import DisplayMovies from "./movies/DisplayMovies";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <DisplayUsers></DisplayUsers>
      <DisplayMovies></DisplayMovies>
    </ApolloProvider>
  );
}

export default App;
