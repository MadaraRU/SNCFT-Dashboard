import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import VoitureDetails from "./components/VoitureDetails";

const VoitureScreen = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
    if (user.role !== "responsable") {
      history.replace("/dashboard/home");
    }
  }, [history, user, user.role]);

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
