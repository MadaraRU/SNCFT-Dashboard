import React from "react";
import { Card, CardBody, Col } from "reactstrap";

const CarsDetails = () => {
  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">DÉTAILS DES VOITURES</h5>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CarsDetails;
