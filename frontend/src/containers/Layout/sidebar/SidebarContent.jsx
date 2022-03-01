import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
// import SidebarCategory from "./SidebarCategory";

const SidebarContent = ({ onClick }) => {
  const handleHideSidebar = () => {
    onClick();
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        {/* <SidebarLink title="Log Out" icon="exit" route="/log_in" onClick={handleHideSidebar} /> */}
      </ul>

      <ul className="sidebar__block">
        {/* <SidebarCategory title="Dashboard" icon="store">
          <SidebarLink
            title="Page one"
            route="/pages/one"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Page two"
            route="/pages/two"
            onClick={handleHideSidebar}
          />
        </SidebarCategory> */}
        <SidebarLink
          icon="store"
          title="Dashboard"
          route="/pages/one"
          onClick={handleHideSidebar}
        />
      </ul>
      {user && user.isAdmin && (
        <ul className="sidebar__block">
          <SidebarLink
            icon="user"
            title="Users"
            route="/pages/two"
            onClick={handleHideSidebar}
          />
        </ul>
      )}
    </div>
  );
};

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SidebarContent;
