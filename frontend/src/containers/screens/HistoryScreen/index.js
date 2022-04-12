import React from "react";
import { Col, Container, Row } from "reactstrap";
import HistoryDetails from "./components/HistoryDetails";

const HistoryScreen = () => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Historique</h3>
        </Col>
      </Row>
      <Row>
        <HistoryDetails />
      </Row>
    </Container>
  );
};

export default HistoryScreen;
