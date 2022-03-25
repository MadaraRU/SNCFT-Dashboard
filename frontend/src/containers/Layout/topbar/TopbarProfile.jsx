import React, { useEffect, useState } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, reset } from "../../../store/auth/authSlice";
import { Redirect } from "react-router-dom";
import { getUserProfile } from "../../../store/users/usersSlice";

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    history.replace("/");
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }
  }, [user]);

  return (
    <div className="topbar__profile">
      <button
        type="button"
        className="topbar__avatar"
        onClick={handleToggleCollapse}
      >
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <p className="topbar__avatar-name">{profile.name}</p>
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
