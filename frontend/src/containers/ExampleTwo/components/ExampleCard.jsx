import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Col, Table, Row } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toast } from "react-toastify";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import EmailIcon from "mdi-react/EmailIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import CardAccountDetailsIcon from "mdi-react/CardAccountDetailsIcon";
import DeleteIcon from "mdi-react/DeleteOutlineIcon";
import "../style/style.css";

import { getUsers, reset, deleteUser } from "../../../store/users/usersSlice";
import { reset as rst } from "../../../store/auth/register/registerSlice";

const ExampleCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Modal Handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Form Handler
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [fetchedData, setFetchData] = useState();

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    role: "",
    password: "",
  });

  const { nom, email, role, password } = formData;

  const {
    isError: errMessage,
    isSuccess: succMessage,
    message: regMessage,
  } = useSelector((state) => state.register);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(rst());
  }, [errMessage, succMessage, regMessage, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addUser = async () => {
    const { data } = await axios.post("/api/users", {
      name: nom,
      email,
      password,
      role,
    });
    setFetchData(data);
  };

  useEffect(() => {
    addUser();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!password || !email || !nom || !role) {
      return;
    } else {
      addUser();

      setFormData({
        nom: "",
        email: "",
        role: "",
        password: "",
      });
    }
  };

  // Fetch users Handler

  const { users, isError, message } = useSelector((state) => state.users);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      history.replace("/login");
    }
    if (user && user.isAdmin) {
      dispatch(getUsers());
    }

    if (fetchedData) {
      dispatch(getUsers());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, history, isError, message, dispatch, fetchedData]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <Row>
              <Col>
                <h5 className="bold-text">Liste d'utilistateur</h5>
              </Col>
              <Col md={3}>
                <div style={{ textAlign: "center" }}>
                  <button className="btn btn-primary my-2" onClick={toggle}>
                    Ajouter un utilistateur
                  </button>
                  <Modal size="m" isOpen={modal} toggle={toggle}>
                    <ModalHeader>Ajouter un utilistateur</ModalHeader>
                    <ModalBody style={{ height: "50vh" }}>
                      <div className="account__wrapper">
                        <form className="form" onSubmit={onSubmit}>
                          <div className="form__form-group">
                            <span className="form__form-group-label">
                              E-mail
                            </span>
                            <div className="form__form-group-field">
                              <div className="form__form-group-icon">
                                <EmailIcon />
                              </div>
                              <input
                                className="modal-input"
                                name="email"
                                type="text"
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="form__form-group">
                            <span className="form__form-group-label">Nom</span>
                            <div className="form__form-group-field">
                              <div className="form__form-group-icon">
                                <AccountOutlineIcon />
                              </div>
                              <input
                                className="modal-input"
                                name="nom"
                                type="text"
                                id="nom"
                                placeholder="nom"
                                value={nom}
                                onChange={onChange}
                              />
                            </div>
                          </div>

                          <div className="form__form-group">
                            <span className="form__form-group-label">
                              Password
                            </span>
                            <div className="form__form-group-field">
                              <div className="form__form-group-icon">
                                <KeyVariantIcon />
                              </div>
                              <input
                                name="password"
                                className="modal-input"
                                type={isPasswordShown ? "text" : "password"}
                                id="password"
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
                            <span className="form__form-group-label">Role</span>
                            <div className="form__form-group-field">
                              <div className="form__form-group-icon">
                                <CardAccountDetailsIcon color="#1f2f61" />
                              </div>
                              <input
                                className="modal-input"
                                name="role"
                                type="text"
                                id="role"
                                placeholder="role"
                                value={role}
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <ModalFooter>
                            <Button
                              color="success"
                              type="submit"
                              onClick={toggle}
                            >
                              Ajouter
                            </Button>
                          </ModalFooter>
                        </form>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Table className="admin-table" responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>{""}</th>
                </tr>
              </thead>
              {users.map((user) => {
                return (
                  <tbody key={user._id}>
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          style={{
                            border: "none",
                          }}
                          className="btn-outline-danger btn-sm 
                          "
                          onClick={() => dispatch(deleteUser(user._id))}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ExampleCard;
