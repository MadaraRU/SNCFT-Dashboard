import React from "react";
import { Col, Container, Row } from "reactstrap";
import MissionDetails from "./components/MissionDetails";

const MissionScreen = () => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion Des Missions</h3>
        </Col>
      </Row>
      <Row>
        <MissionDetails />
      </Row>
    </Container>
  );
};

export default MissionScreen;
