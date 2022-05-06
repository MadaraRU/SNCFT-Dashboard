import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import QuantityIcon from "mdi-react/CounterIcon";
import TypeIcon from "mdi-react/GasStationIcon";
import NatureIcon from "mdi-react/TicketPercentIcon";
import PriceIcon from "mdi-react/CashIcon";

import "../styles/style.css";
import { useDispatch, useSelector } from "react-redux";
import { getParcs } from "../../../../store/parc/parcSlice";

const CarburantDetails = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [carb, setCarb] = useState("");
  const [parcId, setParcId] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalA, setModalA] = useState(false);
  const toggleA = () => setModalA(!modalA);

  const [quantite, setQuantite] = useState();
  const [quantiteA, setQuantiteA] = useState(0);
  const [type, setType] = useState("");
  const [nature, setNature] = useState("");
  const [prix, setPrix] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const [isCarbAdded, setIsCarbAdded] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc } = useSelector((state) => state.parc);

  const AddCarburantToast = useRef(null);

  const getCarburant = async () => {
    const response = await fetch("http://localhost:5000/api/carburant");

    const data = await response.json();

    setFetchedData(data);
  };

  const addCarburant = async (carburant) => {
    const response = await axios.post(
      "http://localhost:5000/api/carburant",
      carburant
    );
    if (response) {
      setIsAdded(!isAdded);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(quantite, type, nature, prix);
    if (!quantite || !type || !nature || !prix) return;

    addCarburant({ quantite, type, nature, prix });

    toggle();
    setQuantite();
    setType("");
    setNature("");
    setPrix();
  };

  const addCarburantToParc = async (parcId, carbId, quantite) => {
    const response = await axios.post(
      `http://localhost:5000/api/parc/${parcId}/carburant`,
      { carbId, quantite }
    );

    if (response) {
      setIsCarbAdded(!isCarbAdded);
    }
  };

  const submitHandlerA = (e) => {
    e.preventDefault();
    if (!quantiteA) return;
    console.log(quantiteA);
    // todo

    addCarburantToParc(parcId, carb._id, +quantiteA);
    AddCarburantToast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Carburant Ajouter ",
    });

    toggleA();
  };

  useEffect(() => {
    getCarburant();

    if (isAdded) {
      getCarburant();
    }

    if (isCarbAdded) {
      getCarburant();
    }

    dispatch(getParcs());
  }, [dispatch, isAdded, isCarbAdded]);

  const showCarburantTemplate = (rowData) => {
    return (
      <Button
        className="btn btn-primary"
        label="Affecter carburant"
        icon="pi pi-plus"
        onClick={() => {
          toggleA();

          console.log(rowData._id);
          return setParcId(rowData._id);
        }}
      />
    );
  };

  return (
    <>
      <Col md={12}>
        <Card>
          <CardBody>
            <div>
              <div className="d-flex justify-content-end">
                <Button
                  label="Ajouter carburant"
                  icon="pi pi-plus"
                  className="btn btn-primary my-3"
                  onClick={() => {
                    toggle();
                  }}
                />
              </div>
              <Toast ref={AddCarburantToast} />
              <DataTable
                value={fetchedData}
                selectionMode="radiobutton"
                selection={carb}
                onSelectionChange={(e) => {
                  console.log(e.value);
                  return setCarb(e.value);
                }}
                responsiveLayout="scroll"
                className="admin-table"
                removableSort
                tableClassName="table"
                dataKey="_id"
                paginator
                rows={4}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="Aucun carburant trouvé"
              >
                <Column
                  selectionMode="single"
                  headerStyle={{ width: "3em" }}
                ></Column>
                <Column field="quantite" header="Quantite" sortable />
                <Column field="type" header="Type" sortable />
                <Column field="nature" header="Nature" sortable />
                <Column field="prix" header="Prix" sortable />
              </DataTable>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col md={12}>
        <Card>
          <CardBody>
            <div>
              <DataTable
                value={parc}
                responsiveLayout="scroll"
                className="admin-table"
                removableSort
                tableClassName="table"
                dataKey="_id"
                paginator
                rows={4}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                emptyMessage="Aucun carburant trouvé"
              >
                <Column field="reference" header="Reference" sortable />
                <Column field="departement" header="Departement" sortable />
                <Column field="localisation" header="Localisation" sortable />
                <Column header="Carburant" body={showCarburantTemplate} />
              </DataTable>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Modal size="m" isOpen={modal} toggle={toggle}>
        <ModalHeader>Ajouter Carburant</ModalHeader>
        <form className="form" onSubmit={submitHandler}>
          <div
            className="account__wrapper"
            style={{
              width: "100%",
            }}
          >
            <ModalBody>
              <div className="form__form-group">
                <span className="form__form-group-label">Quantite</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <QuantityIcon />
                  </div>
                  <input
                    className="modal-input"
                    name="quantite"
                    type="number"
                    id="quantite"
                    placeholder="Quantite"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Type</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <TypeIcon />
                  </div>
                  <select
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      setType(selectedType);
                      console.log(selectedType);
                    }}
                    value={type}
                  >
                    <option value="" disabled>
                      choisi le type
                    </option>
                    <option value="Gasoil">Gasoil</option>
                    <option value="Essence">Essence</option>
                  </select>
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Nature</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <NatureIcon />
                  </div>
                  <input
                    name="nature"
                    className="modal-input"
                    type="text"
                    id="nature"
                    placeholder="Nature"
                    onChange={(e) => setNature(e.target.value)}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Prix</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <PriceIcon />
                  </div>
                  <input
                    name="prix"
                    className="modal-input"
                    type="text"
                    id="prix"
                    placeholder="Prix en TND"
                    onChange={(e) => setPrix(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                label="Ajouter"
                className="btn btn-primary"
                type="submit"
              />
            </ModalFooter>
          </div>
        </form>
      </Modal>

      <Modal size="m" isOpen={modalA} toggle={toggleA}>
        <ModalHeader>Ajouter Carburant</ModalHeader>
        <form className="form" onSubmit={submitHandlerA}>
          <div
            className="account__wrapper"
            style={{
              width: "100%",
            }}
          >
            <ModalBody>
              <div className="form__form-group">
                <span className="form__form-group-label">Quantite</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <QuantityIcon />
                  </div>
                  <input
                    className="modal-input"
                    name="quantiteA"
                    type="number"
                    id="quantiteA"
                    placeholder="Quantite"
                    value={quantiteA}
                    onChange={(e) => setQuantiteA(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                label="Ajouter"
                className="btn btn-primary"
                type="submit"
              />
            </ModalFooter>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CarburantDetails;
