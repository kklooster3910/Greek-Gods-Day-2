import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from '../components/App';
import { HashRouter } from 'react-router-dom';

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
})

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: cache,
    onError: ({ networkError, graphQLErrors }) => {
        // debugger;
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    }
})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));