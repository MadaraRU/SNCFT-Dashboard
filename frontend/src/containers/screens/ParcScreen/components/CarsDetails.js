import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import MatriculeIcon from "mdi-react/CarBackIcon";
import MarqueIcon from "mdi-react/CarSportsIcon";
import ModeleIcon from "mdi-react/TagTextOutlineIcon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import {
  deleteCar,
  getAllCars,
  resetAll,
} from "../../../../store/parcOwnCars/carsPSlice";
import "../style/style.css";

const CarsDetails = (props) => {
  const [parcData, setParcData] = useState([]);
  const [isRemoved, setIsRemoved] = useState();
  const [isAdded, setIsAdded] = useState();
  const [isUnbroken, setIsUnbroken] = useState(false);

  // Toast handler
  const validationToast = useRef(null);
  const deleteToast = useRef(null);
  const duplicationErrorToast = useRef(null);

  // Modal Handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // form elements state
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [matricule, setMatricule] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc } = useSelector((state) => state.parc);
  const { cars } = useSelector((state) => state.carsP);

  const getParcById = async (parcId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await fetch(
      "http://localhost:5000/api/parc/" + parcId,
      config
    );
    const data = await response.json();
    setParcData(data);
  };

  // add car
  const addCar = async (car) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/parc/${props.cardId}/cars`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(car),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        setIsAdded(!isAdded);
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
  };

  //form submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (!matricule || !modele || !marque) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez remplir le formulaire.",
        life: 3000,
      });
      return;
    }

    toggle();
    addCar({ matricule, modele, marque });
    setMarque("");
    setModele("");
    setMatricule("");
  };

  // Action template

  const actionsTemplate = (rowData) => {
    const updateCarToUnbroken = async () => {
      const response = axios.put(
        `http://localhost:5000/api/voiture/${rowData._id}/unbroken`
      );
      if (response) {
        setIsUnbroken(!isUnbroken);
      }
      return response.data;
    };

    const removeCar = () => {
      dispatch(deleteCar(rowData._id));
      setIsRemoved(!isRemoved);
    };

    const confirm = () => {
      confirmDialog({
        message: "Voulez-vous supprimer cette voiture ?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        acceptClassName: "btn btn-danger",
        rejectClassName: "btn btn-primary",
        accept: () => {
          removeCar();
          deleteToast.current.show({
            severity: "info",
            summary: "Info Message",
            detail: "Voiture suprimé",
          });
        },
      });
    };

    const confirmRepaired = () => {
      confirmDialog({
        message: "Voulez-vous vraiment changer l'état de la voiture ?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        acceptClassName: "btn btn-success",
        rejectClassName: "btn btn-primary",
        accept: () => updateCarToUnbroken(),
      });
    };

    return (
      <>
        <Button
          className="btn btn-danger p-button-rounded"
          icon="pi pi-trash "
          onClick={confirm}
        />

        <Button
          className={`btn btn-success p-button-rounded mx-2 ${
            rowData.etat === "marche" && "disabled"
          }`}
          icon="pi pi-car"
          onClick={confirmRepaired}
        />
      </>
    );
  };

  // car state template

  const etatTemplate = (rowData) => {
    return (
      <span
        className={rowData.etat === "marche" ? `etat-marche` : `etat-panne`}
      >
        {rowData.etat}
      </span>
    );
  };

  // car status template

  const statusTemplate = (rowData) => {
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

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }

    if (props.cardId) {
      dispatch(getAllCars(props.cardId));
      getParcById(props.cardId);
    }

    if (isRemoved) {
      dispatch(getAllCars(props.cardId));
    }

    if (isAdded) {
      dispatch(getAllCars(props.cardId));
    }

    if (isUnbroken) {
      dispatch(getAllCars(props.cardId));
    }

    return () => {
      dispatch(resetAll());
    };
  }, [dispatch, user, history, props.cardId, isRemoved, isAdded, isUnbroken]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Details Des Voitures: </h5>
              </div>
            </Col>
            <Col md={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                {parcData.length !== 0 && (
                  <Button
                    className="btn btn-primary my-3"
                    style={{ color: "white" }}
                    label="Ajouter une voiture"
                    icon="pi pi-plus"
                    onClick={toggle}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Modal size="m" isOpen={modal} toggle={toggle}>
            <ModalHeader>Ajouter une Voiture</ModalHeader>
            <form className="form" onSubmit={submitHandler}>
              <div
                className="account__wrapper"
                style={{
                  width: "100%",
                }}
              >
                <ModalBody>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Marque</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <MarqueIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="marque"
                        type="text"
                        id="marque"
                        placeholder="Marque"
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Modele</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <ModeleIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="modele"
                        type="text"
                        id="modele"
                        placeholder="Modele"
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">Matricule</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <MatriculeIcon />
                      </div>
                      <input
                        name="matricule"
                        className="modal-input"
                        type="text"
                        id="matricule"
                        placeholder="Matricule"
                        value={matricule}
                        onChange={(e) => setMatricule(e.target.value)}
                        dir="rtl"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button className="btn btn-primary">Ajouter</Button>
                </ModalFooter>
              </div>
            </form>
          </Modal>

          <Toast ref={validationToast} />
          <Toast ref={deleteToast} />
          <Toast ref={duplicationErrorToast} />

          <div>
            <p
              className="my-2"
              style={{
                fontSize: "1rem",
              }}
            >
              {" "}
              Parc: {parcData.reference}
            </p>
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
              id="car"
            >
              <Column field="marque" header="Marque" sortable />
              <Column field="modele" header="Modele" sortable />
              <Column field="matricule" header="Matricule" sortable />
              <Column body={etatTemplate} header="Etat" />
              <Column header="Status" body={statusTemplate} />
              <Column header="Action" body={actionsTemplate} />
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CarsDetails;
