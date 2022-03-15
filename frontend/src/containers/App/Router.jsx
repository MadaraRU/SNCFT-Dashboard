import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";

import LogIn from "../LogIn/index";
import ExamplePageOne from "../Example/index";
import ExamplePageTwo from "../ExampleTwo/index";
import ProfileScreen from "../screens/ProfileScreen/index";
import ParcScreen from "../screens/ParcScreen/index";

const Pages = () => {
  return (
    <Switch>
      <Route path="/dashboard/home" component={ExamplePageOne} />
      <Route path="/dashboard/admin" component={ExamplePageTwo} />
      <Route path="/dashboard/profile" component={ProfileScreen} />
      <Route path="/dashboard/parc" component={ParcScreen} />
    </Switch>
  );
};

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/dashboard" component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
