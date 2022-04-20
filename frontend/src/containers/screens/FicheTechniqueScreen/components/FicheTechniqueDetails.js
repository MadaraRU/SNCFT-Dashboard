import React, { useEffect } from "react";

import { Card, CardBody, Col } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getParcs } from "../../../../store/parc/parcSlice";
import { getAllCars } from "../../../../store/parcOwnCars/carsPSlice";

import "../styles/style.css";

const FicheTechniqueDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc, isSuccess } = useSelector((state) => state.parc);
  const { cars, isLoading } = useSelector((state) => state.carsP);

  const dp = parc?.filter((p) => p?.departement === user?.departement);

  const showPapersTemplate = (rowData) => {
    return (
      <a
        className="btn-show-papers"
        onClick={() => {
          props.onShow(rowData._id);
        }}
        href="#paper"
      >
        Voir papiers
      </a>
    );
  };

  const matriculeTemplate = (rowData) => {
    return <span dir="rtl">{rowData.matricule}</span>;
  };

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }

    dispatch(getParcs());

    if (isSuccess) {
      dispatch(getAllCars(dp[0]?._id));
    }
  }, [user, history, dispatch, dp[0]?._id]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Fiche Technique: </h5>
          </div>
          <div>
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
              // globalFilter={globalFilter}
            >
              <Column field="marque" header="Marque" sortable />
              <Column field="modele" header="Modele" sortable />
              <Column body={matriculeTemplate} header="Matricule" sortable />
              <Column body={showPapersTemplate} header="Papier" />
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FicheTechniqueDetails;
