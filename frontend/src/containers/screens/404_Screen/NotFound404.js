import React from "react";
import { Link } from "react-router-dom";
import Image404 from "../../../shared/img/404/404-errors.png";
import "../404_Screen/styles/style.css";

const NotFound404 = () => (
  <div className="not-found">
    <div className="not-found__content">
      <img
        className="not-found__image"
        src={Image404}
        style={{
          width: "90%",
        }}
        alt="404"
      />
      <div>
        <div className="not-found__info">
          <h3
            style={{
              color: "black",
              fontWeight: "400",
            }}
          >
            Oups ! La page que vous recherchez est introuvable
          </h3>
          <Link className="p-button p-button-primary" to="/dashboard/home">
            Retour Accueil
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound404;
