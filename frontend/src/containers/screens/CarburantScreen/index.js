import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CarburantDetails from "./components/CarburantDetails";

const CarburantScreen = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
    if (user.role !== "responsable de carburant") {
      history.replace("/dashboard/home");
    }
  }, [history, user, user.role]);

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion De Carburant</h3>
        </Col>
      </Row>
      <Row>
        <CarburantDetails />
      </Row>
    </Container>
  );
};

export default CarburantScreen;
