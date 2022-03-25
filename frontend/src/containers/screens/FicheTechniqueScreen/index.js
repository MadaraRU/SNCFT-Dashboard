import React from "react";
import { Col, Container, Row } from "reactstrap";
import FicheTechniqueDetails from "./components/FicheTechniqueDetails";

const FicheTechniqueScreen = () => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion De Fiche Technique</h3>
        </Col>
      </Row>
      <Row>
        <FicheTechniqueDetails />
      </Row>
    </Container>
  );
};

export default FicheTechniqueScreen;
