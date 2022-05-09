import React, { useEffect, useState } from "react";
import NatureIcon from "mdi-react/TicketPercentIcon";
import PriceIcon from "mdi-react/CashIcon";
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
import { useSelector, useDispatch } from "react-redux";
import {
  getPeronnels,
  reset,
} from "../../../../store/personnel/personnelSlice";
import { Button } from "primereact/button";

const CarteCarburantDetails = () => {
  const [expandedRows, setExpandedRows] = useState(null);
  const [prix, setPrix] = useState();
  const [bonDeCommande, setBonDeCommande] = useState("");
  const [personnelId, setPersonnelId] = useState("");

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { personnel } = useSelector((state) => state.personnel);

  useEffect(() => {
    dispatch(getPeronnels());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const rowExpansionTemplate = (data) => {
    const rechargerCarburantTemplate = (rowData) => {
      return (
        <Button
          className="btn btn-primary"
          label="Recharger"
          icon="pi pi-sync"
        />
      );
    };
    return (
      <div style={{ padding: "1rem" }}>
        <h5 className="my-2" style={{ fontWeight: "600" }}>
          Carte Carburant de {data.nom + " " + data.prenom}
        </h5>
        <DataTable
          value={data.carteCarburant}
          responsiveLayout="scroll"
          dataKey="_id"
          className="admin-table"
          size="small"
          emptyMessage="pas de carte disponible"
        >
          <Column field="quantite" header="Quantite" sortable></Column>
          <Column
            field="bonDeCommande"
            header="Bon De Commande"
            sortable
          ></Column>
          <Column field="prix" header="Prix" sortable></Column>
          <Column
            header="Date De Recharge"
            field="dateDeRecharge"
            sortable
          ></Column>
          <Column header="Action" body={rechargerCarburantTemplate} />
        </DataTable>
      </div>
    );
  };

  return (
    <>
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Gestion de la carte carburant</h5>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                className="btn btn-primary my-3"
                label="Affecter Carte Carburant"
                icon="pi pi-send"
                onClick={toggle}
              />
            </div>
            <DataTable
              rowExpansionTemplate={rowExpansionTemplate}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
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
              <Column expander style={{ width: "3em" }} />
              <Column field="matricule" header="Matricule" sortable />
              <Column field="nom" header="Nom" sortable />
              <Column field="prenom" header="Prenom" sortable />
            </DataTable>
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
                <span className="form__form-group-label">Matricule</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <NatureIcon />
                  </div>
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setPersonnelId(e.target.value);
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choisi le matricule
                    </option>
                    {personnel.map((p) => {
                      return (
                        <option key={p?._id} value={p?._id}>
                          {p.matricule}
                        </option>
                      );
                    })}
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
    </>
  );
};

export default CarteCarburantDetails;
