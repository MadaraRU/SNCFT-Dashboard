import React, { useEffect } from "react";

import { Card, CardBody, Col } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getParcs, reset as resetParc } from "../../../../store/parc/parcSlice";
import { getAllCars, reset } from "../../../../store/parcOwnCars/carsPSlice";

import "../styles/style.css";

const PDamagedCars = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc, isSuccess } = useSelector((state) => state.parc);
  const { cars, isLoading } = useSelector((state) => state.carsP);

  const dp = parc?.filter((p) => p?.departement === user?.departement);

  const showDamagedDetailsTemplate = (rowData) => {
    return (
      <a
        className="btn-show-papers"
        onClick={() => {
          props.onShow(rowData._id);
        }}
        href="#details"
      >
        voir details d'accident/panne
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

    return () => {
      dispatch(reset());
      dispatch(resetParc());
    };
  }, [user, history, dispatch, dp[0]?._id]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Voitures: </h5>
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
              <Column body={showDamagedDetailsTemplate} header="Details" />
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PDamagedCars;
