import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCars, getParcs, reset } from "../../../../store/parc/parcSlice";
import "../style/style.css";

const CarsDetails = (props) => {
  const [parcData, setParcData] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cars, parc } = useSelector((state) => state.parc);

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

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }

    if (props.cardId) {
      dispatch(getAllCars(props.cardId));
      getParcById(props.cardId);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, history, props.cardId]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">DÉTAILS DES VOITURES</h5>
          </div>

          <div>
            <p className="my-2"> Parc: {parcData.reference}</p>
          </div>
          <div>
            <Table responsive className="admin-table">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Marque</th>
                  <th>modele</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => {
                  return (
                    <tr key={car._id}>
                      <td>{car.matricule}</td>
                      <td>{car.marque}</td>
                      <td>{car.modele}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CarsDetails;
