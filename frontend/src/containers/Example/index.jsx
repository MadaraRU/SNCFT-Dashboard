import React from "react";
import { Col, Container, Row } from "reactstrap";
import ExampleCard from "./components/ExampleCard";

const ExamplePage = () => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Sncft Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <ExampleCard />
      </Row>
    </Container>
  );
};

export default ExamplePage;
