import React from "react";
import GodsList from './gods/GodsList.jsx';
import CreateGod from './gods/CreateGod.jsx';
import CreateAbode from './gods/CreateAbode.jsx';
import CreateEmblem from './gods/CreateEmblem.jsx';
import GodDetail from './gods/GodDetail.jsx';
import { Route } from 'react-router-dom' ;

const App = () => {
    return (
      <div>
        <Switch>
            <Route exact path="/gods/:id" component={GodDetail} />
            <Route exact path="/" component={GodsList} />
            <Route exact path="/newgod" component={CreateGod} />
            <Route exact path="/newabode" component={CreateAbode} />
            <Route exact path="/newemblem" component={CreateEmblem} />
        </Switch>
      </div>
    );
};

export default App;