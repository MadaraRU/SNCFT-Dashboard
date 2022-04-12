import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { getallHistory, reset } from "../../../../store/archive/archiveSlice";

const HistoryDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [globalFilter, setGlobalFilter] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { archive } = useSelector((state) => state.archive);

  const createdAtTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString("en-US");
  };

  const header = (
    <div className="d-flex justify-content-between my-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Chercher..."
        />
      </span>
    </div>
  );

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }

    dispatch(getallHistory());

    return () => {
      dispatch(reset());
    };
  }, [user, history, dispatch]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">{header}</div>
          <DataTable
            value={archive}
            responsiveLayout="scroll"
            dataKey="_id"
            removableSort
            className="admin-table"
            tableClassName="table"
            paginator
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            emptyMessage="Aucune voiture disponible"
            globalFilter={globalFilter}
          >
            <Column field="action" header="Action" sortable />
            <Column field="category" header="Category" sortable />
            <Column field="message" header="Description" sortable />
            <Column field="createdBy" header="Cree Par" sortable />
            <Column
              body={createdAtTemplate}
              header="temps de creation"
              sortable
            />
          </DataTable>
        </CardBody>
      </Card>
    </Col>
  );
};

export default HistoryDetails;
