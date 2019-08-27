import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import DeleteGod from "./DeleteGod.jsx";
import { Route } from "react-router";

import Queries from "../../client/graphql/queries";
const { FETCH_GODS } = Queries;

const GodsList = () => {
  // debugger
  // console.log(FETCH_GODS)
  return (
    <div className="outer">
      <ul>
        <Query query={FETCH_GODS}>
          {({ loading, error, data }) => {
            <Route exact path="/" component={GodsList} />;
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.gods.map(({ id, name, description }) => (
              <li key={id}>
                <Link to={`/gods/${id}`}>
                  <h4>{name}</h4>
                </Link>
                <p className="description">Description: {description}</p>
                <DeleteGod id={id} />
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default GodsList;
