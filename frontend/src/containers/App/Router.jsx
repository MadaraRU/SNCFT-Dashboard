import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";

import LogIn from "../LogIn/index";
import ExamplePageOne from "../Example/index";
import ExamplePageTwo from "../ExampleTwo/index";
import ProfileScreen from "../screens/ProfileScreen/index";
import ParcScreen from "../screens/ParcScreen/index";
import MissionScreen from "../screens/MissionScreen/index";
import VoitureScreen from "../screens/VoitureScreen/index";
import FicheTechniqueScreen from "../screens/FicheTechniqueScreen/index";
import { useSelector } from "react-redux";

const Pages = () => {
  return (
    <Switch>
      <Route path="/dashboard/home" component={ExamplePageOne} />
      <Route path="/dashboard/admin" component={ExamplePageTwo} />
      <Route path="/dashboard/profile" component={ProfileScreen} />
      <Route path="/dashboard/parc" component={ParcScreen} />
      <Route path="/dashboard/mission" component={MissionScreen} />
      <Route path="/dashboard/voiture" component={VoitureScreen} />
      <Route
        path="/dashboard/ficheTechnique"
        component={FicheTechniqueScreen}
      />
    </Switch>
  );
};

const wrappedRoutes = () => {
  const { user, isSuccess } = useSelector((state) => state.auth);

  const WelcomeToast = useRef(null);

  useEffect(() => {
    if (user || isSuccess) {
      WelcomeToast.current?.show({
        severity: "info",
        summary: "Info Message",
        detail: `Bienvenu ${user.name}`,
        life: 3000,
      });
    }
  }, [WelcomeToast]);

  return (
    <div>
      <Layout />
      <div className="container__wrap">
        {/* <Route path="/dashboard/" component={Pages} /> */}
        <Pages />
        {/* {user && <Redirect to="/dashboard/home" />} */}
        <Toast ref={WelcomeToast} position="bottom-right" />
      </div>
    </div>
  );
};

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
