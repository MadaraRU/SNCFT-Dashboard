import React, { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
// import CarburantDetails from "./components/CarburantDetails";
import CarsDetails from "./components/CarsDetails";
import ParcDetails from "./components/ParcDetails";

const ExamplePage = (props) => {
  const [cardId, setCardId] = useState("");
  const { user } = useSelector((state) => state.auth);

  const history = useHistory();

  if (user.role !== "admin") {
    history.replace("/dashboard/home");
  }

  const showCarId = (id) => {
    setCardId(id);
  };

  return (
    <Container className="dashboard">
      <ScrollToTop smooth color="#1F2F61" top="100" />

      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion de Parc</h3>
        </Col>
      </Row>
      <Row>
        <ParcDetails onShow={showCarId} />
      </Row>
      <Row>
        <Col md={12}>
          <CarsDetails cardId={cardId} />
        </Col>
        {/* <Col md={6}>
          <CarburantDetails />
        </Col> */}
      </Row>
    </Container>
  );
};

export default ExamplePage;
