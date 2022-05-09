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
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import QuantityIcon from "mdi-react/CounterIcon";
import TypeIcon from "mdi-react/GasStationIcon";
import NatureIcon from "mdi-react/TicketPercentIcon";
import PriceIcon from "mdi-react/CashIcon";

import "../styles/style.css";
import { useDispatch, useSelector } from "react-redux";
import { getParcs } from "../../../../store/parc/parcSlice";
import {
  getPeronnels,
  reset,
} from "../../../../store/personnel/personnelSlice";

const CarburantDetails = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [carb, setCarb] = useState("");
  const [parcId, setParcId] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalA, setModalA] = useState(false);
  const toggleA = () => setModalA(!modalA);
  const [modalAP, setModalAP] = useState(false);
  const toggleAP = () => setModalAP(!modalAP);

  const [quantite, setQuantite] = useState();
  const [quantiteA, setQuantiteA] = useState(0);
  const [type, setType] = useState("");
  const [nature, setNature] = useState("Bon");
  const [bonDeCommande, setBonDeCommande] = useState("");
  const [prix, setPrix] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const [isCarbAdded, setIsCarbAdded] = useState(false);

  const [affectionDialog, setAffectionDialog] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const validationToast = useRef(null);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc } = useSelector((state) => state.parc);
  const { personnel } = useSelector((state) => state.personnel);

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
    if (!quantite || !type || !nature || !prix || !bonDeCommande) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez remplir le formulaire.",
        life: 3000,
      });
      return;
    }

    addCarburant({ quantite, type, nature, prix, bonDeCommande });
    AddCarburantToast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Carburant Ajouter ",
    });

    toggle();
    setQuantite();
    setType("");
    setBonDeCommande("");
    setPrix();
    setCarb("");
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

  const addCarburantToPersonnel = async (persoId, carbId, quantite) => {
    const response = await axios.post(
      `http://localhost:5000/api/Personnel/${persoId}/carburant`,
      { carbId, quantite }
    );

    if (response) {
      setIsCarbAdded(!isCarbAdded);
    }
  };

  const submitHandlerA = (e) => {
    e.preventDefault();
    if (!quantiteA || quantiteA === 0) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez saisir la quantité.",
        life: 3000,
      });
      return;
    }

    // todo

    addCarburantToParc(parcId, carb._id, +quantiteA);
    AddCarburantToast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Carburant Affecter ",
    });

    toggleA();
  };

  const submitHandlerAP = (e) => {
    e.preventDefault();
    if (!quantiteA || quantiteA === 0) {
      validationToast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "veuillez saisir la quantité.",
        life: 3000,
      });
      return;
    }

    // todo

    addCarburantToPersonnel(personnelId, carb._id, +quantiteA);
    AddCarburantToast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Carburant Affecter ",
    });

    toggleAP();
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

    dispatch(getPeronnels());

    return () => {
      dispatch(reset());
    };
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
  const affecterCarburantTemplate = (rowData) => {
    return (
      <Button
        className="btn btn-primary"
        label="Affecter carburant"
        icon="pi pi-plus"
        onClick={() => {
          toggleAP();
          console.log(rowData._id);
          return setPersonnelId(rowData._id);
        }}
      />
    );
  };

  const openAffectaionDialog = () => {
    setAffectionDialog(true);
  };
  const hideAffectaionDialog = () => {
    setAffectionDialog(false);
  };

  const dateTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString("en-US");
  };

  return (
    <>
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Gestion des bons du carburant</h5>
            </div>
            <div>
              <div className="d-flex justify-content-end">
                <Button
                  label="Affecter carburant"
                  icon="pi pi-send"
                  className="btn btn-primary my-3 mx-2"
                  onClick={() => {
                    openAffectaionDialog();
                  }}
                  disabled={carb?.length === 0 || carb === null ? true : false}
                />
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
                value={fetchedData?.filter(
                  (carburant) => carburant.quantite > 0
                )}
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
                <Column field="quantite" header="Quantité" sortable />
                <Column
                  field="bonDeCommande"
                  header="Bon De Commande"
                  sortable
                />
                <Column field="type" header="Type" sortable />
                <Column field="nature" header="Nature" sortable />
                <Column field="prix" header="Prix" sortable />
                <Column body={dateTemplate} header="Date" />
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
                <span className="form__form-group-label">Quantité</span>
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
                    <option value="Gasoil">Gasoil(50L)</option>
                    <option value="Essence">Essence(30L)</option>
                  </select>
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Bon De Commande</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <NatureIcon />
                  </div>
                  <input
                    name="bonDeCommande"
                    className="modal-input"
                    type="text"
                    id="bonDeCommande"
                    placeholder="Bon De Commande"
                    onChange={(e) => setBonDeCommande(e.target.value)}
                    value={bonDeCommande}
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

      <Dialog
        visible={affectionDialog}
        style={{ width: "75vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Affectaion de carburants: "
        modal
        onHide={hideAffectaionDialog}
        className="carburant-dialog"
      >
        <TabView
          className="tabview-header-icon tabview-carburant"
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Departement" leftIcon="pi pi-building">
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
            <Modal size="m" isOpen={modalA} toggle={toggleA} zIndex="2000">
              <ModalHeader>Affecter Carburant</ModalHeader>
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
                      label="Affecter"
                      className="btn btn-primary"
                      type="submit"
                    />
                  </ModalFooter>
                </div>
              </form>
            </Modal>
          </TabPanel>

          <TabPanel header="Personnel" leftIcon="pi pi-user">
            <DataTable
              value={personnel}
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
              <Column field="matricule" header="Matricule" sortable />
              <Column field="nom" header="Nom" sortable />
              <Column field="prenom" header="Prenom" sortable />
              <Column header="Carburant" body={affecterCarburantTemplate} />
            </DataTable>
            <Modal size="m" isOpen={modalAP} toggle={toggleAP} zIndex="2000">
              <ModalHeader>Affecter Carburant</ModalHeader>
              <form className="form" onSubmit={submitHandlerAP}>
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
                      label="Affecter"
                      className="btn btn-primary"
                      type="submit"
                    />
                  </ModalFooter>
                </div>
              </form>
            </Modal>
          </TabPanel>
        </TabView>
      </Dialog>
      <Toast ref={validationToast} />
    </>
  );
};

export default CarburantDetails;
