import React from "react";
import { Card, CardBody, Col } from "reactstrap";
const CarburantDetails = () => {
  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Details des carburants</h5>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CarburantDetails;
