import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as PButton } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Col, Table, Row } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toast } from "react-toastify";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import FingerprintIcon from "mdi-react/FingerprintIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import CardAccountDetailsIcon from "mdi-react/CardAccountDetailsIcon";
import DepartementIcon from "mdi-react/DomainIcon";
import "../style/style.css";

import "primereact/resources/themes/bootstrap-sncft/theme5.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { getUsers, reset, deleteUser } from "../../../store/users/usersSlice";
import { reset as rst } from "../../../store/auth/register/registerSlice";

const ExampleCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { users, isError, message } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const duplicationErrorToast = useRef(null);
  const [duplicationErrorMessage, setDuplicationErrorMessage] = useState("");

  // Modal Handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // search Handler
  const [globalFilter, setGlobalFilter] = useState(null);

  // Form Handler
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [fetchedData, setFetchData] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const [nom, setNom] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [departement, setDepartement] = useState("");

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const {
    isError: errMessage,
    isSuccess: succMessage,
    message: regMessage,
  } = useSelector((state) => state.register);

  useEffect(() => {
    if (errMessage) {
      duplicationErrorToast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: `${regMessage}`,
      });
    }

    dispatch(rst());
  }, [errMessage, succMessage, regMessage, dispatch]);

  //  add user api
  const addUser = async () => {
    // try {
    //   const response = await axios.post("/api/users", {
    //     name: nom,
    //     userName,
    //     password,
    //     role,
    //     departement,
    //   });

    //   console.log(response);

    //   if (response.data) {
    //     setFetchData(data);
    //   }
    // } catch (error) {
    //   console.log(first)
    // }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nom,
          userName,
          password,
          role,
          departement:
            departement.charAt(0).toUpperCase() + departement.slice(1),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      if (response.ok) {
        setFetchData(data);
      }
    } catch (error) {
      if (error) {
        duplicationErrorToast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: `${error.message}`,
        });
      }
    }

    // if (response.data?.message) {
    //   duplicationErrorToast.current.show({
    //     severity: "error",
    //     summary: "Error Message",
    //     detail: `${data?.message}`,
    //   });
    // }
  };

  const addToast = useRef(null);
  const validationToast = useRef(null);

  // Form submit
  const onSubmit = (e) => {
    e.preventDefault();

    if (!password || !userName || !nom || !role) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez remplir le formulaire.",
        life: 3000,
      });
      return;
    } else {
      addUser();
      toggle();

      setFetchData(null);

      setNom("");
      setUserName("");
      setRole("");
      setPassword("");
      addToast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Utilisateur ajouté",
        life: 3000,
      });
    }
  };

  // Delete UI Handler
  const deleteToast = useRef(null);

  const DeleteButton = (rowData) => {
    const confirmDelete = () => {
      confirmDialog({
        message: "Voulez-vous supprimer cet utilisateur ?",
        header: "Confirmation de suppression",
        icon: "pi pi-info-circle",
        acceptClassName: "btn btn-danger btn-delete-yes",
        rejectClassName: "btn btn-outline-primary btn-delete-no",
        acceptLabel: "oui",
        rejectLabel: "non",
        accept: () => {
          dispatch(deleteUser(rowData._id));
          setDeleted(!deleted);
          deleteToast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Utilisateur supprimé",
            life: 3000,
          });
        },
      });
    };
    return (
      <>
        <PButton
          icon="pi pi-trash"
          className={
            rowData.userName !== user.userName
              ? `btn btn-danger btn-delete `
              : `btn btn-danger btn-delete disabled`
          }
          onClick={confirmDelete}
        />
      </>
    );
  };

  // table header (Search field)

  const header = (
    <div className="d-flex justify-content-between my-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Chercher un utilisateur..."
        />
      </span>
    </div>
  );

  // Fetch users Handler

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      history.replace("/log_in");
    }
    if ((user && user.isAdmin) || user.role === "admin") {
      dispatch(getUsers());
    }

    if (fetchedData) {
      dispatch(getUsers());
    }

    if (deleted) {
      dispatch(getUsers());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, history, isError, message, dispatch, fetchedData, deleted]);

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
                  <PButton
                    className="btn btn-primary my-3 "
                    label="Ajouter un utilistateur"
                    icon="pi pi-plus"
                    onClick={toggle}
                  />
                  <Modal size="m" isOpen={modal} toggle={toggle}>
                    <ModalHeader>Ajouter un utilistateur</ModalHeader>
                    <form className="form" onSubmit={onSubmit}>
                      <div
                        className="account__wrapper"
                        style={{
                          width: "100%",
                        }}
                      >
                        <ModalBody>
                          <div className="form__form-group">
                            <span className="form__form-group-label">
                              Username
                            </span>
                            <div className="form__form-group-field">
                              <div className="form__form-group-icon">
                                <FingerprintIcon />
                              </div>
                              <input
                                className="modal-input"
                                name="userName"
                                type="text"
                                id="userName"
                                placeholder="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
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
                                onChange={(e) => setNom(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
                              <select
                                className="modal-input"
                                style={{
                                  width: "100%",
                                }}
                                onChange={(e) => {
                                  const selectedRole = e.target.value;
                                  setRole(selectedRole);
                                }}
                                defaultValue={role}
                              >
                                <option value={role} disabled hidden>
                                  Choisir un rôle
                                </option>
                                <option value="admin">admin</option>
                                <option value="responsable">responsable</option>
                              </select>
                            </div>
                          </div>
                          {role === "responsable" && (
                            <div className="form__form-group">
                              <span className="form__form-group-label">
                                Departement
                              </span>
                              <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                  <DepartementIcon color="#1f2f61" />
                                </div>
                                <input
                                  name="departement"
                                  className="modal-input"
                                  type="text"
                                  id="departement"
                                  placeholder="Departement"
                                  value={departement}
                                  onChange={(e) =>
                                    setDepartement(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" type="submit">
                            Ajouter
                          </Button>
                        </ModalFooter>
                      </div>
                    </form>
                  </Modal>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Toast ref={deleteToast} />
            <Toast ref={addToast} />
            <Toast ref={validationToast} />
            <Toast ref={duplicationErrorToast} />
            {header}
            <DataTable
              value={users}
              responsiveLayout="scroll"
              size="large"
              className="admin-table"
              removableSort
              tableClassName="table"
              dataKey="_id"
              paginator
              rows={4}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              globalFilter={globalFilter}
            >
              <Column field="name" header="Nom" sortable></Column>
              <Column field="userName" header="Username" sortable></Column>
              <Column field="role" header="Role" sortable></Column>
              <Column
                field="departement"
                header="Departement"
                sortable
              ></Column>
              <Column header="Action" body={DeleteButton}></Column>
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ExampleCard;
