import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../client/graphql/mutations";
import Queries from "../../client/graphql/queries";
const { NEW_ABODE } = Mutations;
const { FETCH_ABODES } = Queries;

class AbodeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", coordinates: "" };
  }

  handleSubmit(e, newAbode) {
    e.preventDefault();
    name = this.state.name;
    newAbode({
      variables: {
        name: name,
        type: this.state.coordinates
      }
    }).then(data => {
      console.log(data);
      this.setState({
        message: `New abode "${name}" create successfully`,
        name: "",
        coordinates: ""
      });
    });
  }

  updateCache(
    cache,
    {
      data: { newAbode }
    }
  ) {
    let abodes;
    try {
      // we'll try to read from our cache but if the query isn't in there no sweat!
      // We only want to update the data if it's in the cache already - totally fine if the data will
      // be fetched fresh later
      abodes = cache.readQuery({ query: FETCH_ABODES });
    } catch (err) {
      return;
    }

    // then our writeQuery will only run IF the cache already has data in it
    if (abodes) {
      let abodesArray = abodes.abodes;

      cache.writeQuery({
        query: FETCH_ABODES,
        data: { abodes: abodesArray.concat(newAbode) }
      });
    }
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newAbode, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newAbode)}>
              <input
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
              />
              <input
                onChange={this.update("coordinates")}
                value={this.state.coordinates}
                placeholder="Coords"
              />
              
              <button type="submit">Create Abode</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AbodeCreate;
