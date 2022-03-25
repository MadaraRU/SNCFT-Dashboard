import React, { useState, useEffect, useRef } from "react";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link, useHistory } from "react-router-dom";
import { login, reset } from "../../../store/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";

const LogInForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = formData;

  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const ErrorToast = useRef(null);
  const blankFieldToast = useRef(null);

  useEffect(() => {
    if (isError) {
      ErrorToast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "les informations d'identification invalides",
        life: 3000,
      });
    }

    if (isSuccess || user) {
      history.push("/dashboard/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, history, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!password || !userName) {
      blankFieldToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "Veuillez remplir les champs",
      });
      return;
    }

    const userData = {
      userName,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <input
            name="userName"
            type="text"
            placeholder="userName"
            value={userName}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Password</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <input
            name="password"
            type={isPasswordShown ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
          <button
            className={`form__form-group-button${
              isPasswordShown ? " active" : ""
            }`}
            onClick={() => handleShowPassword()}
            type="button"
          >
            <EyeIcon />
          </button>
        </div>
      </div>
      <div className="form__form-group">
        <div className="form__form-group-field"></div>
      </div>
      <button
        type="submit"
        className="btn btn-primary account__btn account__btn--small"
      >
        Sign In
      </button>
      <Toast ref={ErrorToast} />
      <Toast ref={blankFieldToast} />
    </form>
  );
};

export default LogInForm;
