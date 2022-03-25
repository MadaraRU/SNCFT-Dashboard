import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  // getAllMissions,
  reset,
  setMissions,
} from "../../../../store/mission/missionSlice";
// import { getAllMissions } from "../../../../store/userOwnMission/missionUSlice";
import { getAllMissions } from "../../../../store/parcOwnMission/missionPSlice";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import NomMissionIcon from "mdi-react/HighwayIcon";
import NomAgent from "mdi-react/HatFedoraIcon";
import DateIcon from "mdi-react/CalendarMonthIcon";
import DestinationIcon from "mdi-react/GoogleMapsIcon";
import MatriculeIcon from "mdi-react/CarEstateIcon";

import "primereact/resources/themes/bootstrap-sncft/theme5.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "../style/style.css";
import {
  getAllCars,
  getParcs,
  reset as rst,
} from "../../../../store/parc/parcSlice";
import axios from "axios";

const MissionDetails = () => {
  // const { missionP } = useSelector((state) => state.missionP);
  const { mission } = useSelector((state) => state.missionP);
  const { user } = useSelector((state) => state.auth);
  const { parc, cars } = useSelector((state) => state.parc);

  const dispatch = useDispatch();
  const history = useHistory();

  const [isFini, setIsFini] = useState();
  const [isAdded, setIsAdded] = useState();

  // components rerendring

  // Mission add data
  const [nom, setNom] = useState("");
  const [nomAgent, setNomAgent] = useState("");
  const [matricule, setMatricule] = useState("");
  const [dateDeMission, setDateDeMission] = useState("");
  const [destination, setDistination] = useState("");

  // Car Data

  const dateFormatter = (rowData) => {
    return rowData.dateDeMission.substr(0, 10);
  };

  const statusTemplate = (rowData) => {
    return (
      <span
        className={
          rowData.missionStatus === "en cours"
            ? `status-en_cours`
            : `status-fini`
        }
      >
        {rowData.missionStatus}
      </span>
    );
  };

  const endOfMissionTemplate = (rowData) => {
    const endMission = async () => {
      const resp = await axios.put(
        `http://localhost:5000/api/mission/${rowData?._id}/fini`
      );
      if (resp) {
        setIsFini(resp.data);
      }
      return resp.data;
    };

    const confirm = () => {
      confirmDialog({
        message: "Êtes-vous sûr de terminer la mission?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClassName: "btn btn-success",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        rejectClassName: "btn btn-primary",
        accept: () => endMission(),
      });
    };

    return (
      <Button
        className="btn btn-success p-button-rounded "
        icon="pi pi-check-circle"
        type="button"
        onClick={confirm}
      />
    );
  };

  // Modal Handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nom || !nomAgent || !dateDeMission || !destination || !matricule) {
      return;
    } else {
      toggle();
    }
    // dispatch(
    //   setMissions({ nom, nomAgent, dateDeMission, destination, matricule })
    // );
    addMissionP({ nom, nomAgent, dateDeMission, destination, matricule });

    setNom("");
    setNomAgent("");
    setDateDeMission("");
    setDistination("");
    setMatricule("");
  };

  const dp = parc?.filter((p) => p?.departement === user?.departement);

  const addMissionP = async (mission) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.post(
      `http://localhost:5000/api/parc/${dp[0]?._id}/mission`,
      mission,
      config
    );
    if (response) {
      setIsAdded(true);
    }
    return response.data;
  };

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }
    // setTimeout(() => {
    //   dispatch(getAllMissionsP(dp[0]?._id));
    // }, 2000);
    // dispatch(getAllMissions(user?._id));
    dispatch(getAllMissions(dp[0]?._id));

    dispatch(getParcs());

    if (isFini) {
      dispatch(getAllMissions(dp[0]?._id));
    }
    if (isAdded) {
      dispatch(getAllMissions(dp[0]?._id));
    }

    setTimeout(() => {
      dispatch(getAllCars(dp[0]._id));
    });

    return () => {
      dispatch(reset());
      dispatch(rst());
    };
  }, [user, dispatch, history, dp[0]?._id, isAdded, isFini]);

  console.log(cars);

  return (
    <>
      <Col md={12}>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <div className="card__title">
                  <h5 className="bold-text">Details Des Missions</h5>
                </div>
              </Col>
              <Col md={4}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    className="btn btn-primary my-3"
                    style={{ color: "white" }}
                    label="Ajouter une mission"
                    icon="pi pi-plus"
                    onClick={toggle}
                  />
                </div>
              </Col>
            </Row>

            <Modal size="m" isOpen={modal} toggle={toggle}>
              <ModalHeader>Ajouter une Mission</ModalHeader>
              <form className="form" onSubmit={submitHandler}>
                <div
                  className="account__wrapper"
                  style={{
                    width: "100%",
                  }}
                >
                  <ModalBody>
                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Nom De Mission
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <NomMissionIcon />
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
                        Nom D'agent
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <NomAgent />
                        </div>
                        <input
                          className="modal-input"
                          name="nomAgent"
                          type="text"
                          id="nomAgent"
                          placeholder="nom d'agent"
                          value={nomAgent}
                          onChange={(e) => setNomAgent(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Date De Mission
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <DateIcon />
                        </div>
                        <input
                          name="data"
                          className="modal-input"
                          type="date"
                          id="date"
                          placeholder="date"
                          min="2020-01-01"
                          max="2030-01-01"
                          value={dateDeMission}
                          onChange={(e) => setDateDeMission(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Destination
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <DestinationIcon />
                        </div>
                        <input
                          name="destination"
                          className="modal-input"
                          type="text"
                          id="destination"
                          placeholder="destination"
                          value={destination}
                          onChange={(e) => setDistination(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Matricule</span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <MatriculeIcon />
                        </div>
                        <select
                          className="modal-input"
                          style={{
                            width: "100%",
                          }}
                          defaultValue={matricule}
                          onChange={(e) => {
                            const selectedMatricule = e.target.value;
                            setMatricule(selectedMatricule);
                          }}
                        >
                          {cars?.map((c) => {
                            return (
                              <option key={c._id} value={c.matricule}>
                                {c.matricule}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary">Ajouter</Button>
                  </ModalFooter>
                </div>
              </form>
            </Modal>

            <div>
              <DataTable
                value={mission?.filter((m) => m.missionStatus === "en cours")}
                responsiveLayout="scroll"
                dataKey="_id"
                removableSort
                className="admin-table"
                tableClassName="table"
                paginator
                rows={5}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="Aucune mission disponible"
              >
                <Column field="nom" header="Nom" sortable />
                <Column field="nomAgent" header="Nom D'agent" sortable />
                <Column field="matricule" header="Matricule" sortable />
                <Column
                  body={dateFormatter}
                  header="Date De Mission"
                  sortable
                />
                <Column field="destination" header="Destination" sortable />
                <Column body={statusTemplate} header="Status" sortable />
                <Column body={endOfMissionTemplate} header="Action" />
              </DataTable>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col md={12}>
        <div>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Details Du Parc: </h5>
                  </div>

                  <DataTable
                    value={dp}
                    responsiveLayout="scroll"
                    dataKey="_id"
                    removableSort
                    className="admin-table"
                    tableClassName="table"
                  >
                    <Column field="reference" header="Reference" />
                    <Column field="localisation" header="Localisation" />
                    <Column field="departement" header="Departement" />
                  </DataTable>
                </CardBody>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Details Des Voitures: </h5>
                  </div>
                  <DataTable
                    value={cars}
                    responsiveLayout="scroll"
                    dataKey="_id"
                    removableSort
                    className="admin-table"
                    tableClassName="table"
                    paginator
                    rows={5}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    emptyMessage="Aucune voiture disponible"
                  >
                    <Column field="marque" header="Marque" />
                    <Column field="matricule" header="Matricule" />
                    <Column field="modele" header="Modele" />
                  </DataTable>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Historique Des Missions: </h5>
            </div>
            <div>
              <DataTable
                value={mission?.filter((m) => m.missionStatus === "fini")}
                responsiveLayout="scroll"
                dataKey="_id"
                removableSort
                className="admin-table"
                tableClassName="table"
                paginator
                rows={5}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              >
                <Column field="nom" header="Nom" sortable />
                <Column field="nomAgent" header="Nom D'agent" sortable />
                <Column field="matricule" header="Matricule" sortable />
                <Column
                  body={dateFormatter}
                  header="Date De Mission"
                  sortable
                />
                <Column field="destination" header="Destination" sortable />
                <Column body={statusTemplate} header="Status" sortable />
              </DataTable>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default MissionDetails;
