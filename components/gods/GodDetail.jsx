import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../client/graphql/queries";

const { FETCH_GOD } = Queries;

const GodDetail = (props) => {
  return (
    // there we are getting the `id` for our query from React Router
    <Query query={FETCH_GOD} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        return <div className="detail" />;
      }}
    </Query>
  );
}

export default GodDetail;