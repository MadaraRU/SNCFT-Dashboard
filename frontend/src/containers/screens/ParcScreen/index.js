import React from "react";
import { Col, Container, Row } from "reactstrap";
import CarburantDetails from "./components/CarburantDetails";
import CarsDetails from "./components/CarsDetails";
import ParcDetails from "./components/ParcDetails";

const ExamplePage = (props) => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion de Parc</h3>
        </Col>
      </Row>
      <Row>
        <ParcDetails />
      </Row>
      <Row>
        <Col md={6}>
          <CarsDetails />
        </Col>
        <Col md={6}>
          <CarburantDetails />
        </Col>
      </Row>
    </Container>
  );
};

export default ExamplePage;
