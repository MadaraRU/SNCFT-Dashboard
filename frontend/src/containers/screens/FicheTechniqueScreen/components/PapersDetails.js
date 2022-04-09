import React, { useEffect } from "react";

import { Card, CardBody, Col } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllPapers,
  reset,
} from "../../../../store/carOwnPapers/papersCSlice";

const PapersDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { papers } = useSelector((state) => state.papersC);

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

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }

    if (props.carsId) {
      dispatch(getAllPapers(props.carsId));
    }

    return () => {
      dispatch(reset());
    };
  }, [history, user, dispatch, props.carsId]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Details de papiers: </h5>
          </div>
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
