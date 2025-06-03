import React from "react";
import { Route, Switch } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Home from "../pages/Home";
import Detail from "../pages/detail/Detail";

import * as Config from "../constants/config";

const Routes = () => {
  return (
    <Switch>
      <Route
        path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
        component={Catalog}
      />
      <Route path={`/${Config.HOME_PAGE}/:category/:id`} component={Detail} />
      <Route path={`/${Config.HOME_PAGE}/:category`} component={Catalog} />
      <Route path={`/${Config.HOME_PAGE}`} exact component={Home} />
    </Switch>
  );
};

export default Routes;