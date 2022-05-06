import React, { useEffect, useState } from "react";

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
import AssuranceIcon from "mdi-react/ShieldCarIcon";
import VisiteIcon from "mdi-react/CarTractionControlIcon";
import VignietteIcon from "mdi-react/CarKeyIcon";
import AssurancePriceIcon from "mdi-react/CashIcon";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllPapers,
  reset,
} from "../../../../store/carOwnPapers/papersCSlice";

const PapersDetails = (props) => {
  const [carData, setCarData] = useState([]);
  const [assurance, setAssurance] = useState("");
  const [visite, setVisite] = useState("");
  const [vigniette, setVigiette] = useState("");
  const [prixAssurance, setPrixAssurance] = "";

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { papers } = useSelector((state) => state.papersC);

  // modal handler
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // table columns template

  const assuranceTemplate = (rowData) => {
    return rowData.assurance.substr(0, 10);
  };
  const visiteTemplate = (rowData) => {
    return rowData.visite.substr(0, 10);
  };
  const vignietteTemplate = (rowData) => {
    return rowData.vigniette.substr(0, 10);
  };
  const prixAssuranceTemplate = (rowData) => {
    return `${rowData.prixAssurance} TND`;
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

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }

    if (props.carsId) {
      dispatch(getAllPapers(props.carsId));
      getCarById(props.carsId);
    }

    return () => {
      dispatch(reset());
    };
  }, [history, user, dispatch, props.carsId]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Details de papiers: </h5>
              </div>
            </Col>
            <Col
              md={3}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {carData.length !== 0 && (
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
            <ModalHeader>Ajouter papier</ModalHeader>
            <form className="form">
              <div
                className="account__wrapper"
                style={{
                  width: "100%",
                }}
              >
                <ModalBody>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Date d'assurance:
                    </span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <AssuranceIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="assurance"
                        type="date"
                        id="assurance"
                        placeholder="Assurance"
                        value={assurance}
                        min="2022-01-01"
                        max="2023-01-01"
                        onChange={(e) => setAssurance(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Date de visite:
                    </span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <VisiteIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="visite"
                        type="date"
                        id="visite"
                        placeholder="Assurance"
                        value={visite}
                        onChange={(e) => setVisite(e.target.value)}
                        min="2022-01-01"
                        max="2023-01-01"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Date de vigniette:
                    </span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <VignietteIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="vigniette"
                        type="date"
                        id="vigniette"
                        placeholder="Assurance"
                        value={vigniette}
                        onChange={(e) => setVigiette(e.target.value)}
                        min="2022-01-01"
                        max="2023-01-01"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Prix d'assurance:
                    </span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <AssurancePriceIcon />
                      </div>
                      <input
                        className="modal-input"
                        name="prixAssurance"
                        type="number"
                        id="prixAssurance"
                        placeholder="prix"
                        value={prixAssurance}
                        onChange={(e) => setPrixAssurance(e.target.value)}
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
          <div>
            <DataTable
              value={papers}
              responsiveLayout="scroll"
              dataKey="_id"
              id="paper"
              removableSort
              className="admin-table"
              tableClassName="table"
              paginator
              rows={5}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              emptyMessage="Aucune papier disponible"
            >
              <Column body={assuranceTemplate} header="Date d'assurance" />
              <Column body={visiteTemplate} header="Date de visite" />
              <Column body={vignietteTemplate} header="Date de vigniette" />
              <Column body={prixAssuranceTemplate} header="Prix D'assurance" />
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PapersDetails;
