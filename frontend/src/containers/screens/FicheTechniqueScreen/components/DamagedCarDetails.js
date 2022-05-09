import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NomAgentIcon from "mdi-react/AccountTieHatIcon";
import DateIcon from "mdi-react/CalendarMonthIcon";
import LocationIcon from "mdi-react/MapMarkerRadiusIcon";
import PriceIcon from "mdi-react/CashIcon";
import TypeOfDamageIcon from "mdi-react/CloseOctagonIcon";

import {
  getAllDamagedCarDetails,
  reset,
} from "../../../../store/carDamagedDetails/damagedCSlice";

const DamagedCarDetails = (props) => {
  const [carData, setCarData] = useState([]);
  const [nomAgent, setNomAgent] = useState("");
  const [typeDeDommage, setTypeDeDommage] = useState("");
  const [date, setDate] = useState("");
  const [prixDeReparation, setPrixDeReparation] = useState("");
  const [location, SetLocation] = useState("");

  const [isAdded, setIsAdded] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { damaged } = useSelector((state) => state.damagedC);

  const validationToast = useRef(null);

  // modal handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // table columns template

  const dateDeDommageTemplate = (rowData) => {
    return rowData.date.substr(0, 10);
  };
  const prixDeReparationTemplate = (rowData) => {
    return `${rowData.prixDeReparation} TND`;
  };

  const getCarById = async (carId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await fetch(
      `http://localhost:5000/api/voiture/${carId}`,
      config
    );
    const data = await response.json();

    setCarData(data);
  };

  const addCarDamageDetails = async (details) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.post(
      `http://localhost:5000/api/voiture/${props.carsId}/damaged`,
      details,
      config
    );

    if (response) {
      setIsAdded(!isAdded);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !location ||
      !date ||
      !prixDeReparation ||
      !nomAgent ||
      !typeDeDommage
    ) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez remplir le formulaire.",
        life: 3000,
      });
      return;
    }

    addCarDamageDetails({
      nomAgent,
      date,
      location,
      prixDeReparation: +prixDeReparation,
      typeDeDommage,
    });
    toggle();

    setNomAgent("");
    setDate("");
    SetLocation("");
    setPrixDeReparation("");
    setTypeDeDommage("");
  };

  useEffect(() => {
    // let isMounted = true;
    if (!user) {
      history.replace("/");
    }

    // const getCarById = async (carId) => {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   };

    //   const response = await fetch(
    //     `http://localhost:5000/api/voiture/${carId}`,
    //     config
    //   );
    //   const data = await response.json();
    //   if (isMounted) {
    //     setCarData(data);
    //   }
    // };

    if (props.carsId) {
      dispatch(getAllDamagedCarDetails(props.carsId));
      getCarById(props.carsId);
    }

    if (isAdded) {
      dispatch(getAllDamagedCarDetails(props.carsId));
    }

    return () => {
      dispatch(reset());
      // isMounted = false;
    };
  }, [history, user, dispatch, props.carsId, isAdded]);

  console.log(damaged);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Details d'accident/panne: </h5>
              </div>
            </Col>
            <Col
              md={3}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {carData?.length !== 0 && (
                <Button
                  className="btn btn-primary"
                  label="Ajouter papier"
                  icon="pi pi-plus"
                  onClick={toggle}
                />
              )}
            </Col>
          </Row>
          <p
            style={{
              fontSize: "1rem",
            }}
          >
            Voiture: <span dir="rtl">{carData.matricule}</span>
          </p>
          <Modal size="m" isOpen={modal} toggle={toggle}>
            <ModalHeader>Ajouter Details d'accident/panne</ModalHeader>
            <form className="form" onSubmit={submitHandler}>
              <div
                className="account__wrapper"
                style={{
                  width: "100%",
                }}
              >
                <ModalBody>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Nom d'agent:</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <NomAgentIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="nomAgent"
                        type="text"
                        id="nomAgent"
                        placeholder="Nom d'agent"
                        value={nomAgent}
                        onChange={(e) => setNomAgent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Type de dommage:
                    </span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <TypeOfDamageIcon />
                      </div>
                      <select
                        style={{
                          width: "100%",
                        }}
                        defaultValue=""
                        value={typeDeDommage}
                        onChange={(e) => {
                          const selectedType = e.target.value;
                          setTypeDeDommage(selectedType);
                        }}
                      >
                        <option value="" disabled>
                          Choisir le type de dommage
                        </option>
                        <option value="Accident">Accident</option>
                        <option value="Panne">Panne</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Date:</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <DateIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="date"
                        type="date"
                        id="date"
                        placeholder="Date d'accident/panne"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min="2022-01-01"
                        max="2023-01-01"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Lieu</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <LocationIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="location"
                        type="number"
                        id="location"
                        placeholder="lieu d'accident/panne"
                        value={location}
                        onChange={(e) => SetLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Prix de reparation
                    </span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <PriceIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="prixDeReparation"
                        type="number"
                        id="prixDeReparation"
                        placeholder="Prix en TND"
                        value={prixDeReparation}
                        onChange={(e) => setPrixDeReparation(e.target.value)}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button className="btn btn-primary" type="submit">
                    Ajouter
                  </Button>
                </ModalFooter>
              </div>
            </form>
          </Modal>
          <div>
            <Toast ref={validationToast} />
            <DataTable
              value={damaged}
              responsiveLayout="scroll"
              dataKey="_id"
              id="details"
              removableSort
              className="admin-table"
              tableClassName="table"
              paginator
              rows={5}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              emptyMessage="Aucune details disponible"
            >
              <Column field="nomAgent" header="Nom d'agent" />
              <Column field="typeDeDommage" header="Type de dommage" />
              <Column body={dateDeDommageTemplate} header="Date" />
              <Column field="location" header="Lieu" />
              <Column
                body={prixDeReparationTemplate}
                header="Prix de reparation"
              />
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DamagedCarDetails;
