import React, { useEffect, useState } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import profileIcon from "mdi-react/AccountOutlineIcon";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, reset } from "../../../store/auth/authSlice";
import { resetAll as missionReset } from "../../../store/parcOwnMission/missionPSlice";
import { resetAll as carReset } from "../../../store/parcOwnCars/carsPSlice";
import {
  resetAll as usersProfileReset,
  resetProfile,
} from "../../../store/users/usersSlice";
import { reset as parcReset } from "../../../store/parc/parcSlice";
import { Redirect } from "react-router-dom";
import { getUserProfile } from "../../../store/users/usersSlice";

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.users);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(carReset());
    dispatch(missionReset());
    dispatch(usersProfileReset());
    dispatch(parcReset());
    history.replace("/");
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }

    return () => {
      dispatch(resetProfile());
    };
  }, [user, dispatch]);

  return (
    <div className="topbar__profile">
      <button
        type="button"
        className="topbar__avatar"
        onClick={handleToggleCollapse}
      >
        {/* <img className="topbar__avatar-img" src={Ava} alt="avatar" /> */}
        <span className="topbar__avatar-img">
          <i className="pi pi-user" style={{ fontSize: "1.4rem" }} />
        </span>
        <p
          className="topbar__avatar-name"
          style={{
            color: "#000",
          }}
        >
          {profile.name}
        </p>
        <DownIcon className="topbar__icon" />
      </button>
      {isCollapsed && (
        <button
          type="button"
          aria-label="button collapse"
          className="topbar__back"
          onClick={handleToggleCollapse}
        />
      )}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          {/* <TopbarMenuLink title="Page one" icon="list" path="/pages/one" />
          <TopbarMenuLink title="Page two" icon="inbox" path="/pages/two" />
          <div className="topbar__menu-divider" /> */}
          <div className="topbar__link">
            <span className={`topbar__link-icon lnr lnr-exit`} />
            <button
              onClick={onLogout}
              className="topbar__link-title"
              style={{
                backgroundColor: "transparent",
                textDecoration: "none",
                borderStyle: "none",
                width: "100%",
                textAlign: "left",
                fontWeight: "500",
              }}
            >
              logout
            </button>
            {!user && <Redirect exact path="/" />}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;
