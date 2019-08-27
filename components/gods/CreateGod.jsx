import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../client/graphql/mutations";
import Queries from "../../client/graphql/queries";
const { NEW_GOD } = Mutations;
const { FETCH_GODS } = Queries;

class GodCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", type: 'god' };
  }

  handleSubmit(e, newGod) {
    e.preventDefault();
    name = this.state.name;
    newGod({
      variables: {
        name: name,
        type: this.state.type,
        description: this.state.description
      }
    }).then(data => {
      console.log(data);
      this.setState({
        message: `New god "${name}" create successfully`,
        name: "",
        type: "god",
        description: ""
      });
    });
  }

  updateCache(
    cache,
    {
      data: { newGod }
    }
  ) {
    let gods;
    try {
      // we'll try to read from our cache but if the query isn't in there no sweat!
      // We only want to update the data if it's in the cache already - totally fine if the data will
      // be fetched fresh later
      gods = cache.readQuery({ query: FETCH_GODS });
    } catch (err) {
      return;
    }

    // then our writeQuery will only run IF the cache already has data in it
    if (gods) {
      let godArray = gods.gods;

      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: godArray.concat(newGod) }
      });
    }
  }

  update(field) {
    return e => {
        this.setState({[field]: e.target.value})
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newGod, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newGod)}>
              <input
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
              />
              <select value={this.state.type} onChange={this.update("type")}>
                <option value="god">God</option>
                <option value="goddess">Goddess</option>
              </select>
              <textarea
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="description"
              />
              <button type="submit">Create God</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default GodCreate;
