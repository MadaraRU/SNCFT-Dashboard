import React, { useEffect, useState } from "react";

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
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getParcs } from "../../../../store/parc/parcSlice";
import {
  getAllCars,
  reset,
  deleteCar,
} from "../../../../store/parcOwnCars/carsPSlice";
import "../style/style.css";
import axios from "axios";

const VoitureDetails = () => {
  // const [isAdded, setIsAdded] = useState();
  // const [isRemoved, setIsRemoved] = useState();

  const [isBroken, setIsBroken] = useState(false);

  // Modal Handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // search Handler
  const [globalFilter, setGlobalFilter] = useState(null);

  // // form elements state
  // const [marque, setMarque] = useState("");
  // const [modele, setModele] = useState("");
  // const [matricule, setMatricule] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc, isSuccess } = useSelector((state) => state.parc);
  const { cars, isLoading } = useSelector((state) => state.carsP);

  // Action template

  // const actionsTemplate = (rowData) => {
  //   const removeCar = () => {
  //     dispatch(deleteCar(rowData._id));
  //     setIsRemoved(!isRemoved);
  //   };

  //   const confirm = () => {
  //     confirmDialog({
  //       message: "Voulez-vous supprimer cette voiture ?",
  //       header: "Confirmation",
  //       icon: "pi pi-exclamation-triangle",
  //       acceptLabel: "Oui",
  //       rejectLabel: "Non",
  //       acceptClassName: "btn btn-danger",
  //       rejectClassName: "btn btn-primary",
  //       accept: () => removeCar(),
  //     });
  //   };

  //   return (
  //     <Button className="btn btn-danger" icon="pi pi-trash" onClick={confirm} />
  //   );
  // };

  // table header (Search field)
  const header = (
    <div className="d-flex justify-content-between my-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Chercher une voiture..."
        />
      </span>
    </div>
  );

  const etatTemplate = (rowData) => {
    return (
      <span
        className={rowData.etat === "marche" ? `etat-marche` : `etat-panne`}
      >
        {rowData.etat}
      </span>
    );
  };

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

  const actionTemplate = (rowData) => {
    const updateCarToBroken = async () => {
      const response = axios.put(
        `http://localhost:5000/api/voiture/${rowData._id}/broken`
      );
      if (response) {
        setIsBroken(!isBroken);
      }
      return response.data;
    };

    const confirm = () => {
      confirmDialog({
        message: "Voulez-vous vraiment changer l'état de la voiture ?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Oui",
        rejectLabel: "Non",
        acceptClassName: "btn btn-danger",
        rejectClassName: "btn btn-primary",
        accept: () => updateCarToBroken(),
      });
    };

    return (
      <Button
        className={`btn btn-danger p-button-rounded ${
          rowData.etat === "en panne" && "disabled"
        }`}
        icon="pi pi-car"
        onClick={confirm}
      />
    );
  };

  // add car
  // const addCar = async (car) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   };
  //   const response = axios.post(
  //     `http://localhost:5000/api/parc/${dp[0]?._id}/cars`,
  //     car,
  //     config
  //   );
  //   if (response) {
  //     setIsAdded(!isAdded);
  //   }
  //   return response.data;
  // };

  // //form submit
  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   if (!matricule || !modele || !marque) {
  //     return;
  //   }

  //   toggle();
  //   addCar({ matricule, modele, marque });
  //   setMarque("");
  //   setModele("");
  //   setMatricule("");
  // };

  const dp = parc?.filter((p) => p?.departement === user?.departement);

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }

    dispatch(getParcs());

    if (isSuccess) {
      dispatch(getAllCars(dp[0]?._id));
    }

    if (isBroken) {
      dispatch(getAllCars(dp[0]?._id));
    }

    return () => {
      dispatch(reset());
    };
  }, [history, dispatch, dp[0]?._id, isBroken]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Details Des Voitures</h5>
              </div>
            </Col>
            {/* <Col md={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  className="btn btn-primary my-3"
                  style={{ color: "white" }}
                  label="Ajouter une voiture"
                  icon="pi pi-plus"
                  onClick={toggle}
                />
              </div>
            </Col> */}
          </Row>

          {/* <Modal size="m" isOpen={modal} toggle={toggle}>
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
                  <Button color="primary">Ajouter</Button>
                </ModalFooter>
              </div>
            </form>
          </Modal> */}

          <div>
            {header}
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
              globalFilter={globalFilter}
            >
              <Column field="marque" header="Marque" sortable />
              <Column field="modele" header="Modele" sortable />
              <Column field="matricule" header="Matricule" sortable />
              <Column body={etatTemplate} header="Etat" sortable />
              <Column body={statusTemplate} header="Status" sortable />
              <Column body={actionTemplate} header="Action" />
              {/* <Column header="Action" body={actionsTemplate} /> */}
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default VoitureDetails;
