import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import DamagedCarDetailsScreen from "../screens/FicheTechniqueScreen/DamagedCarDetailsScreen";
import HistoryScreen from "../screens/HistoryScreen/index";
import CarburantScreen from "../screens/CarburantScreen/index";
import NotFound404 from "../screens/404_Screen/NotFound404";

import { useSelector } from "react-redux";

// const Pages = () => {
//   return (
//     <Switch>
//       <Route path="/dashboard/home" component={ExamplePageOne} />
//       <Route path="/dashboard/admin" component={ExamplePageTwo} />
//       <Route path="/dashboard/profile" component={ProfileScreen} />
//       <Route path="/dashboard/parc" component={ParcScreen} />
//       <Route path="/dashboard/mission" component={MissionScreen} />
//       <Route path="/dashboard/voiture" component={VoitureScreen} />
//       <Route
//         path="/dashboard/ficheTechnique"
//         component={FicheTechniqueScreen}
//       />
//       <Route path="/dashboard/history" component={HistoryScreen} />
//     </Switch>
//   );
// };

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
        <Switch>
          <Route path="/dashboard/home" component={ExamplePageOne} />
          <Route path="/dashboard/admin" component={ExamplePageTwo} />
          <Route path="/dashboard/profile" component={ProfileScreen} />
          <Route path="/dashboard/parc" component={ParcScreen} />
          <Route path="/dashboard/mission" component={MissionScreen} />
          <Route path="/dashboard/voiture" component={VoitureScreen} />
          <Route
            path="/dashboard/ficheTechnique/papers"
            component={FicheTechniqueScreen}
          />
          <Route
            path="/dashboard/ficheTechnique/damaged"
            component={DamagedCarDetailsScreen}
          />
          <Route path="/dashboard/history" component={HistoryScreen} />
          <Route path="/dashboard/carburant" component={CarburantScreen} />
          <Route path="*" component={NotFound404} />
        </Switch>
        <Toast ref={WelcomeToast} position="bottom-right" />
      </div>
    </div>
  );
};

const Router = () => (
  <MainWrapper>
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/log_in" component={LogIn} />
          <Route path="/" component={wrappedRoutes} />
        </Switch>
      </BrowserRouter>
    </main>
  </MainWrapper>
);

export default Router;
