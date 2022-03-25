import React from "react";
import { Col, Container, Row } from "reactstrap";
import VoitureDetails from "./components/VoitureDetails";

const VoitureScreen = () => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion Des Voitures</h3>
        </Col>
      </Row>
      <Row>
        <VoitureDetails />
      </Row>
    </Container>
  );
};

export default VoitureScreen;
