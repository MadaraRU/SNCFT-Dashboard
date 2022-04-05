import React from "react";
import { Col, Container, Row } from "reactstrap";
import MissionDetails from "./components/MissionDetails";
import ScrollToTop from "react-scroll-to-top";

const MissionScreen = () => {
  return (
    <Container className="dashboard">
      <ScrollToTop smooth color="#1F2F61" top="100" />
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
