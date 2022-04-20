import React from "react";
import LogInForm from "./components/LogInForm";
import background from "../../shared/img/login/login-background.jpg";

import "../LogIn/styles/style.css";

const LogIn = () => (
  <div
    className="account"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">
            Welcome to
            <span className="account__logo">
              {" "}
              SN
              <span className="account__logo-accent">CFT</span>
            </span>
          </h3>
        </div>
        <LogInForm />
        <div className="account__social"></div>
      </div>
    </div>
  </div>
);

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
