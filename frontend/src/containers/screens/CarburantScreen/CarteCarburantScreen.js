import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import CarteCarburantDetails from "./components/CarteCarburantDetails";

const CarteCarburantScreen = () => {
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
      <ScrollToTop smooth color="#1F2F61" top="100" />
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion Du Carburant</h3>
        </Col>
      </Row>
      <Row>
        <CarteCarburantDetails />
      </Row>
    </Container>
  );
};

export default CarteCarburantScreen;
