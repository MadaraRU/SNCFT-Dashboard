import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllMissions,
  reset,
} from "../../../../store/parcOwnMission/missionPSlice";
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
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import NomMissionIcon from "mdi-react/HighwayIcon";
import NomAgent from "mdi-react/HatFedoraIcon";
import DateIcon from "mdi-react/CalendarMonthIcon";
import DestinationIcon from "mdi-react/GoogleMapsIcon";
import MatriculeIcon from "mdi-react/CarEstateIcon";
import DescriptionIcon from "mdi-react/MessageQuestionOutlineIcon";
import CarburantTypeIcon from "mdi-react/GasStationIcon";
import QuantityIcon from "mdi-react/CounterIcon";

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
import { Dialog } from "primereact/dialog";

const MissionDetails = () => {
  const {
    mission,
    isSuccess: isSuccessMission,
    isLoading,
  } = useSelector((state) => state.missionP);
  const { user } = useSelector((state) => state.auth);
  const {
    parc,
    cars,
    isSuccess: isSuccessCar,
  } = useSelector((state) => state.parc);

  const dispatch = useDispatch();
  const history = useHistory();

  const [isFini, setIsFini] = useState();
  const [isCancel, setIsCancel] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const [description, setDescription] = useState("");
  const [carburantType, setCarburantType] = useState("");
  const [quantite, setQuantite] = useState("");
  const [carbId, setCarbId] = useState("");
  const [isCarbQtyUpdated, setIsCarbQtyUpdated] = useState(false);
  const [carburant, setCarburant] = useState([]);

  const [isUpdatedToAvailable, setIsUpdatedToAvailable] = useState(false);

  const [desc, setDesc] = useState(null);

  const [modalC, setModalC] = useState(false);
  const toggleC = () => setModalC(!modalC);

  const [descriptionDialog, setDescriptionDialog] = useState(false);

  const [selectedCarId, setSelectedCarId] = useState("");

  // Toast handler
  const validationToast = useRef(null);
  const addToast = useRef(null);
  const missionFiniToast = useRef(null);
  const missionAnnullerToast = useRef(null);

  // search Handler
  const [globalFilter, setGlobalFilter] = useState(null);
  const [globalFilter1, setGlobalFilter1] = useState(null);
  const [globalFilter2, setGlobalFilter2] = useState(null);

  // components rerendring

  // Mission add data
  const [nom, setNom] = useState("");
  const [nomAgent, setNomAgent] = useState("");
  const [matricule, setMatricule] = useState("");
  const [dateDeMission, setDateDeMission] = useState("");
  const [destination, setDistination] = useState("");

  // mission Data

  const dateFormatter = (rowData) => {
    return rowData.dateDeMission.substr(0, 10);
  };

  const statusTemplate = (rowData) => {
    return (
      <span
        className={
          rowData.missionStatus === "en cours"
            ? `status-en_cours`
            : rowData.missionStatus === "annuller"
            ? `status-annuller`
            : `status-fini`
        }
      >
        {rowData.missionStatus}
      </span>
    );
  };

  const matriculeTemplate = (rowData) => {
    return <span dir="rtl">{rowData.matricule}</span>;
  };
  const matriculeAnnullerTemplate = (rowData) => {
    return <span dir="rtl">{rowData.matricule}</span>;
  };
  const matriculeFiniTemplate = (rowData) => {
    return <span dir="rtl">{rowData.matricule}</span>;
  };

  // car status template

  const carStatusTemplate = (rowData) => {
    return (
      <span
        className={
          rowData.status === "disponible"
            ? `status-car__disponible`
            : `status-car__mission`
        }
      >
        {rowData.status}
      </span>
    );
  };

  // Car changing state handler
  const getCarIdByMatricule = (matricule) => {
    fetch("http://localhost:5000/api/voiture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricule: matricule,
      }),
    })
      .then((res) => res.json())
      .then((data) => setSelectedCarId(data));
  };

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const updateCarToAvailable = async (carId) => {
    const response = await axios.put(
      `/api/voiture/${carId}/available`,
      "",
      config
    );
    return response.data;
  };

  const updateCarToUnavailable = async (carId) => {
    const response = await axios.put(
      `/api/voiture/${carId}/unavailable`,
      "",
      config
    );
    return response.data;
  };

  // table header (Search field)
  const header = (
    <div className="d-flex justify-content-between my-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Chercher une mission..."
        />
      </span>
    </div>
  );
  const header1 = (
    <div className="d-flex justify-content-between my-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter1(e.target.value)}
          placeholder="Chercher une mission..."
        />
      </span>
    </div>
  );
  const header2 = (
    <div className="d-flex justify-content-between my-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter2(e.target.value)}
          placeholder="Chercher une mission..."
        />
      </span>
    </div>
  );

  const endOfMissionTemplate = (rowData) => {
    const endMission = async () => {
      const resp = await axios.put(
        `http://localhost:5000/api/mission/${rowData?._id}/fini`,
        "",
        config
      );
      if (resp) {
        setIsFini(resp.data);
      }
      return resp.data;
    };
    const cancelMission = async (reason) => {
      // if (description.trim().length === 0) return;
      const resp = await axios.put(
        `http://localhost:5000/api/mission/${rowData?._id}/annuller`,
        reason,
        config
      );
      if (resp) {
        setIsCancel(resp.data);
      }
    };

    const confirm = () => {
      getCarIdByMatricule(rowData.matricule);
      console.log(rowData.matricule);
      console.log(selectedCarId);

      confirmDialog({
        message: "Êtes-vous sûr de terminer la mission?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClassName: "btn btn-success",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        rejectClassName: "btn btn-primary",
        accept: () => {
          endMission();
          setIsUpdatedToAvailable(!isUpdatedToAvailable);
          missionFiniToast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Mission fini",
          });
        },
      });
    };
    const confirmCancel = () => {
      getCarIdByMatricule(rowData.matricule);
      console.log(rowData.matricule);
      console.log(selectedCarId);

      confirmDialog({
        message: "Êtes-vous sûr d'annuller la mission?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClassName: "btn btn-danger",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        rejectClassName: "btn btn-primary",
        accept: () => toggleC(),
      });
    };

    const submitCancelHandler = (e) => {
      e.preventDefault();
      // if (!description) return;
      cancelMission({
        description: !description ? "Pas de motif" : description,
      });
      setIsUpdatedToAvailable(!isUpdatedToAvailable);

      missionAnnullerToast.current.show({
        severity: "info",
        summary: "Info Message",
        detail: "Mission annuller",
      });
      setDescription("");
      toggleC();
      setSelectedCarId("");
    };

    return (
      <>
        {" "}
        <Button
          className="btn btn-success p-button-rounded "
          icon="pi pi-check-circle"
          type="button"
          onClick={confirm}
        />
        <Button
          className="btn btn-danger p-button-rounded mx-2"
          type="button"
          icon="pi pi-times-circle"
          onClick={confirmCancel}
        />
        <Modal size="m" isOpen={modalC} toggle={toggleC}>
          <ModalHeader>Annuller la mission</ModalHeader>
          <form className="form" onSubmit={submitCancelHandler}>
            <div
              className="account__wrapper"
              style={{
                width: "100%",
              }}
            >
              <ModalBody>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Motif d'annulation:{" "}
                  </span>
                  <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                      <DescriptionIcon />
                    </div>
                    <textarea
                      className="modal-input"
                      name="description"
                      type="text"
                      id="description"
                      placeholder="motif..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="btn btn-danger">Annuller</Button>
              </ModalFooter>
            </div>
          </form>
        </Modal>
      </>
    );
  };

  // Description UI handler

  const hideDescriptionDialog = () => {
    setDescriptionDialog(false);
  };

  const showDescriptionDialog = (mission) => {
    setDesc({ ...mission });
    setDescriptionDialog(true);
  };

  const matriculeEnCoursTemplate = (rowData) => {
    return <span dir="rtl">{rowData.matricule}</span>;
  };

  const showMissionCancelReasons = (rowData) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          className="btn btn-primary "
          icon="pi pi-search"
          onClick={() => {
            showDescriptionDialog(rowData);
          }}
        />
      </div>
    );
  };

  // Modal Handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nom || !nomAgent || !dateDeMission || !destination || !matricule) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez remplir le formulaire.",
        life: 3000,
      });
      return;
    }
    // getCarIdByMatricule(matricule);

    updateCarToUnavailable(selectedCarId);

    addMissionP({
      nom,
      nomAgent,
      dateDeMission: new Date(dateDeMission),
      destination,
      matricule,
    });
    addToast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Mission ajouté",
      life: 3000,
    });
    updateCarburantParcQuantity(+quantite, carbId);

    toggle();

    setNom("");
    setNomAgent("");
    setDateDeMission("");
    setDistination("");
    setMatricule("");
    setCarburantType("");
    setQuantite("");
    setSelectedCarId("");
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
      setIsAdded(!isAdded);
    }
    return response.data;
  };

  const getCarburant = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios(
      `http://localhost:5000/api/parc/${dp[0]?._id}/carburant`,
      config
    );
    const data = await response.data;

    setCarburant(data);
  };

  const updateCarburantParcQuantity = async (quantite, carbId) => {
    const response = await axios.put(
      `http://localhost:5000/api/parc/${dp[0]?._id}/carburant`,
      { quantite, carbId }
    );
    const data = await response.data;

    setIsCarbQtyUpdated(!isCarbQtyUpdated);
  };

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }
    if (isSuccessCar) {
      dispatch(getAllMissions(dp[0]?._id));
    }

    dispatch(getParcs());

    if (isFini) {
      dispatch(getAllMissions(dp[0]?._id));
    }
    if (isAdded) {
      dispatch(getAllMissions(dp[0]?._id));
    }
    if (isCancel) {
      dispatch(getAllMissions(dp[0]?._id));
    }

    if (dp[0]?._id) {
      getCarburant();
    }

    if (isCarbQtyUpdated) {
      getCarburant();
    }

    if (isSuccessCar) {
      dispatch(getAllCars(dp[0]._id));
    }

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    dispatch,
    history,
    dp[0]?._id,
    isAdded,
    isFini,
    isCancel,
    isCarbQtyUpdated,
  ]);

  useEffect(() => {
    if (isUpdatedToAvailable) {
      updateCarToAvailable(selectedCarId);
    }
  }, [selectedCarId, isUpdatedToAvailable]);

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
                    className="btn btn-primary"
                    color="primary"
                    style={{ color: "white" }}
                    label="Ajouter une mission"
                    icon="pi pi-plus"
                    onClick={toggle}
                  />
                </div>
              </Col>
            </Row>

            <Modal size="m" isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Ajouter une Mission</ModalHeader>
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
                          value={matricule}
                          defaultValue=""
                          onChange={(e) => {
                            const selectedMatricule = e.target.value;
                            console.log(selectedMatricule);
                            setMatricule(selectedMatricule);
                            getCarIdByMatricule(selectedMatricule);
                          }}
                        >
                          <option value="" defaultValue="" disabled>
                            Choisir une voiture
                          </option>
                          {cars?.filter(
                            (c) =>
                              c.etat === "marche" && c.status === "disponible"
                          ).length === 0 && (
                            <option value="" defaultValue="" disabled>
                              Pas de voiture disponible
                            </option>
                          )}
                          {cars
                            ?.filter(
                              (c) =>
                                c.etat === "marche" && c.status === "disponible"
                            )
                            .map((c) => {
                              return (
                                <option key={c._id} value={c.matricule}>
                                  {c.matricule}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Type De Carburant
                      </span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <CarburantTypeIcon />
                        </div>
                        <select
                          style={{ width: "100%" }}
                          value={carburantType}
                          defaultValue=""
                          onChange={(e) => {
                            console.log(
                              e.target.options[e.target.selectedIndex].dataset
                                .id
                            );
                            setCarburantType(e.target.value);
                            return setCarbId(
                              e.target.options[e.target.selectedIndex].dataset
                                .id
                            );
                          }}
                        >
                          <option value="" defaultValue="" disabled>
                            Choisir type de carburant
                          </option>
                          {carburant.map((c) => {
                            return (
                              <option
                                key={c._id}
                                data-id={c._id}
                                value={c.type}
                              >
                                {c.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Quantite</span>
                      <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                          <QuantityIcon />
                        </div>
                        <input
                          name="quantite"
                          className="modal-input"
                          type="number"
                          id="quantite"
                          placeholder="quantite"
                          value={quantite}
                          onChange={(e) => setQuantite(e.target.value)}
                        />
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {cars?.filter(
                      (c) => c.etat === "marche" && c.status === "disponible"
                    ).length !== 0 && (
                      <Button className="btn btn-primary">Ajouter</Button>
                    )}
                  </ModalFooter>
                </div>
              </form>
            </Modal>
            <Toast ref={validationToast} />
            <Toast ref={addToast} />
            <Toast ref={missionFiniToast} />
            <Toast ref={missionAnnullerToast} />

            <div>
              {header}
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
                globalFilter={globalFilter}
              >
                <Column field="nom" header="Nom" sortable />
                <Column field="nomAgent" header="Nom D'agent" sortable />
                <Column
                  body={matriculeEnCoursTemplate}
                  header="Matricule"
                  sortable
                />
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
            <Col md={5}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Details Du Carburant: </h5>
                  </div>
                  <DataTable
                    value={carburant}
                    responsiveLayout="scroll"
                    dataKey="_id"
                    removableSort
                    className="admin-table"
                    tableClassName="table"
                    emptyMessage="Pas de carburant disponible"
                  >
                    <Column field="quantite" header="Quantite" />
                    <Column field="type" header="Type" />
                    <Column field="nature" header="Nature" />
                  </DataTable>

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

            <Col md={7}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Voitures Disponible: </h5>
                  </div>
                  <DataTable
                    value={cars?.filter((c) => c.etat === "marche")}
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
                    <Column body={matriculeTemplate} header="Matricule" />
                    <Column field="modele" header="Modele" />
                    <Column body={carStatusTemplate} header="Status" />
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
            <p
              style={{
                fontSize: "1rem",
              }}
            >
              Mission Fini:{" "}
            </p>
            <div>
              {header1}
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
                emptyMessage="Aucune mission disponible"
                globalFilter={globalFilter1}
              >
                <Column field="nom" header="Nom" sortable />
                <Column field="nomAgent" header="Nom D'agent" sortable />
                <Column
                  body={matriculeFiniTemplate}
                  header="Matricule"
                  sortable
                />
                <Column
                  body={dateFormatter}
                  header="Date De Mission"
                  sortable
                />
                <Column field="destination" header="Destination" sortable />
                <Column body={statusTemplate} header="Status" sortable />
              </DataTable>
            </div>
            <Dialog
              visible={descriptionDialog}
              style={{ width: "500px" }}
              breakpoints={{ "960px": "75vw", "640px": "100vw" }}
              header="Motif d'annulation: "
              modal
              onHide={hideDescriptionDialog}
            >
              <p>{desc?.description}</p>
            </Dialog>

            <div className="my-5">
              <p
                style={{
                  fontSize: "1rem",
                }}
              >
                Mission Annuller:{" "}
              </p>
              {header2}
              <div>
                <DataTable
                  value={mission?.filter((m) => m.missionStatus === "annuller")}
                  responsiveLayout="scroll"
                  dataKey="_id"
                  removableSort
                  className="admin-table"
                  tableClassName="table"
                  paginator
                  rows={5}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  emptyMessage="Aucune mission disponible"
                  globalFilter={globalFilter2}
                >
                  <Column field="nom" header="Nom" sortable />
                  <Column field="nomAgent" header="Nom D'agent" sortable />
                  <Column
                    body={matriculeAnnullerTemplate}
                    header="Matricule"
                    sortable
                  />
                  <Column
                    body={dateFormatter}
                    header="Date De Mission"
                    sortable
                  />
                  <Column field="destination" header="Destination" sortable />
                  <Column body={statusTemplate} header="Status" />
                  <Column
                    body={showMissionCancelReasons}
                    header="Motif d'annulation"
                  />
                </DataTable>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default MissionDetails;
