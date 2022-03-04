import React, { useState, useEffect } from "react";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link, useHistory } from "react-router-dom";
import { login, reset } from "../../../store/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      history.push("/pages/one");
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
    </form>
  );
};

export default LogInForm;
