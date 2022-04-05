import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";

import {
  Col,
  Card,
  CardBody,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ReferenceIcon from "mdi-react/SmartCardOutlineIcon";
import DepartementIcon from "mdi-react/DomainIcon";
import LocalisationIcon from "mdi-react/MapMarkerOutlineIcon";
import CapaciteIcon from "mdi-react/HumanCapacityIncreaseIcon";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getParcs,
  reset,
  setParc,
  removeParc,
} from "../../../../store/parc/parcSlice";
import "../style/style.css";

const ParcDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc } = useSelector((state) => state.parc);

  // Modal handler
  const [modal, setModal] = useState(false);
  const [modalU, setModalU] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleU = () => setModalU(!modalU);

  // search Handler
  const [globalFilter, setGlobalFilter] = useState(null);

  // Form control , Form submit handler
  const [formData, setFormData] = useState({
    reference: "",
    departement: "",
    localisation: "",
  });

  const [refIsValid, setRefIsValid] = useState(true);
  const [departIsValid, setDepartIsValid] = useState(true);
  const [localIsValid, setLocalIsValid] = useState(true);

  const [isDeleted, setIsDeleted] = useState(false);

  const { reference, departement, localisation } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addToast = useRef(null);
  const updateToast = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault(e);

    if (!departement || !reference || !localisation) {
      setRefIsValid(false);
      setDepartIsValid(false);
      setLocalIsValid(false);
      return;
    } else {
      toggle();
      setRefIsValid(true);
      setDepartIsValid(true);
      setLocalIsValid(true);
    }

    dispatch(setParc({ reference, localisation, departement }));
    addToast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Parc ajouté",
      life: 3000,
    });
    setFormData({
      reference: "",
      departement: "",
      localisation: "",
    });
  };

  //form update handler
  const [formDataU, setFormDataU] = useState({
    referenceU: undefined,
    departementU: undefined,
    localisationU: undefined,
  });
  const [parcIdU, setParcIdU] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { referenceU, departementU, localisationU } = formDataU;

  const onChangeU = (e) => {
    setFormDataU((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateParc = async (pId, parcU) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.put(
      "http://localhost:5000/api/parc/" + pId,
      parcU,
      config
    );

    if (response) {
      setUpdated(true);
    }

    return response.data;
  };

  const submitHandlerU = (e) => {
    e.preventDefault();

    // dispatch(updateParc({ parcIdU, formDataU }));

    updateParc(parcIdU, {
      reference: referenceU,
      departement: departementU,
      localisation: localisationU,
    });

    setFormDataU({
      referenceU: undefined,
      departementU: undefined,
      localisationU: undefined,
    });

    if (isUpdated) {
      toggleU();
    }

    setIsUpdated(!isUpdated);
  };

  // parc car table UI
  const ShowCar = (rowData) => {
    return (
      <a
        className="btn-show-car"
        href="#car"
        onClick={() => {
          props.onShow(rowData._id);
        }}
      >
        Voir voitures
      </a>
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
          placeholder="Chercher un parc..."
        />
      </span>
    </div>
  );

  // Delete and Update UI
  const deleteToast = useRef(null);

  const [parcData, setParcData] = useState([]);

  const carActions = (rowData) => {
    const confirmRemove = () => {
      confirmDialog({
        message: "Voulez-vous supprimer cet parc ?",
        header: "Confirmation de suppression",
        icon: "pi pi-info-circle",
        acceptClassName: "btn btn-danger btn-delete-yes",
        rejectClassName: "btn btn-outline-primary btn-delete-no",
        acceptLabel: "oui",
        rejectLabel: "non",
        accept: () => {
          dispatch(removeParc(rowData._id));
          setIsDeleted(!isDeleted);
          deleteToast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Parc supprimé",
            life: 3000,
          });
        },
      });
    };

    return (
      <>
        <Button
          icon="pi pi-trash"
          className="btn btn-danger p-button-rounded mx-1"
          onClick={confirmRemove}
        />
        <Button
          icon="pi pi-cog"
          className="btn btn-info p-button-rounded"
          onClick={() => {
            toggleU();
            setParcData(rowData);
          }}
        />
      </>
    );
  };

  // Get parc

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }

    dispatch(getParcs());

    if (isDeleted) {
      dispatch(getParcs());
    }

    if (updated) {
      dispatch(getParcs());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, history, isDeleted, updated]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">DÉTAILS DE Parcs</h5>
              </div>
            </Col>
            <Col md={2}>
              <Button
                className="btn btn-primary my-3"
                style={{ color: "white" }}
                label="Ajouter un parc"
                icon="pi pi-plus"
                onClick={toggle}
              />

              <Modal size="m" isOpen={modal} toggle={toggle}>
                <ModalHeader>Ajouter un parc</ModalHeader>
                <form className="form" onSubmit={submitHandler}>
                  <div
                    className="account__wrapper"
                    style={{
                      width: "100%",
                    }}
                  >
                    <ModalBody style={{ height: "50vh" }}>
                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Reference
                        </span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <ReferenceIcon />
                          </div>
                          <input
                            className={
                              refIsValid ? `modal-input` : `modal-input-error`
                            }
                            name="reference"
                            type="text"
                            id="reference"
                            placeholder="Reference"
                            value={reference}
                            onChange={onChange}
                            onBlur={() => {
                              setRefIsValid(true);
                            }}
                          />
                        </div>
                        {!refIsValid && (
                          <div>
                            <p style={{ color: "red", marginLeft: "30px" }}>
                              Ce champ ne doit pas rester vide
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Departement
                        </span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <DepartementIcon />
                          </div>
                          <input
                            className={
                              departIsValid
                                ? `modal-input`
                                : `modal-input-error`
                            }
                            name="departement"
                            type="text"
                            id="departement"
                            placeholder="Departement"
                            value={departement}
                            onChange={onChange}
                            onBlur={() => {
                              setDepartIsValid(true);
                            }}
                          />
                        </div>
                        {!departIsValid && (
                          <div>
                            <p style={{ color: "red", marginLeft: "30px" }}>
                              Ce champ ne doit pas rester vide
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Localisation
                        </span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <LocalisationIcon />
                          </div>
                          <input
                            name="localisation"
                            className={
                              localIsValid ? `modal-input` : `modal-input-error`
                            }
                            id="localisation"
                            placeholder="Localisation"
                            value={localisation}
                            onChange={onChange}
                            onBlur={() => {
                              setLocalIsValid(true);
                            }}
                          />
                        </div>

                        {!localIsValid && (
                          <div>
                            <p style={{ color: "red", marginLeft: "30px" }}>
                              Ce champ ne doit pas rester vide
                            </p>
                          </div>
                        )}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" type="submit">
                        Ajouter
                      </Button>
                    </ModalFooter>
                  </div>
                </form>
              </Modal>
            </Col>
          </Row>
          <div>
            <Modal size="m" isOpen={modalU} toggle={toggleU}>
              <ModalHeader>Modifier le parc</ModalHeader>
              <form className="form" onSubmit={submitHandlerU}>
                <div
                  className="account__wrapper"
                  style={{
                    width: "100%",
                  }}
                >
                  <ModalBody style={{ height: "50vh" }}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Reference</span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <ReferenceIcon />
                        </div>
                        <input
                          className="modal-input"
                          name="referenceU"
                          type="text"
                          id="referenceU"
                          placeholder={parcData?.reference}
                          value={
                            referenceU === undefined
                              ? parcData.reference
                              : referenceU
                          }
                          onChange={onChangeU}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Departement
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <DepartementIcon />
                        </div>
                        <input
                          className="modal-input"
                          name="departementU"
                          type="text"
                          id="departementU"
                          placeholder={parcData?.departement}
                          value={
                            departementU === undefined
                              ? parcData.departement
                              : departementU
                          }
                          onChange={onChangeU}
                        />
                      </div>
                    </div>

                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Localisation
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <LocalisationIcon />
                        </div>
                        <input
                          name="localisationU"
                          className="modal-input"
                          id="localisationU"
                          placeholder={parcData?.localisation}
                          value={
                            localisationU === undefined
                              ? parcData.localisation
                              : localisationU
                          }
                          onChange={onChangeU}
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      type="submit"
                      onClick={() => {
                        setParcIdU(parcData._id);
                        setIsUpdated(!isUpdated);
                        updateToast.current.show({
                          severity: "info",
                          summary: "Success",
                          detail: "Parc modifé",
                          life: 3000,
                        });
                      }}
                    >
                      Modifier
                    </Button>
                  </ModalFooter>
                </div>
              </form>
            </Modal>
            <Toast ref={addToast} />
            <Toast ref={deleteToast} />
            <Toast ref={updateToast} />
            {header}
            <DataTable
              value={parc}
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
              emptyMessage="Aucun parc trouvé"
            >
              <Column field="reference" header="Reference" sortable></Column>
              <Column
                field="departement"
                header="Departement"
                sortable
              ></Column>
              <Column
                field="localisation"
                header="Localisation"
                sortable
              ></Column>
              <Column header="Voiture" body={ShowCar}></Column>
              <Column header="Action" body={carActions}></Column>
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ParcDetails;
