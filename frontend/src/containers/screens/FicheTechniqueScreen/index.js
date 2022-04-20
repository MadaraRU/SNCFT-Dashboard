import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { Col, Container, Row } from "reactstrap";
import FicheTechniqueDetails from "./components/FicheTechniqueDetails";
import PapersDetails from "./components/PapersDetails";

const FicheTechniqueScreen = () => {
  const [carId, setCarId] = useState("");

  const showCarId = (id) => {
    setCarId(id);
  };

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
      <ScrollToTop smooth color="#1F2F61" top="100" />
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion De Fiche Technique</h3>
        </Col>
      </Row>
      <Row>
        <FicheTechniqueDetails onShow={showCarId} />
      </Row>
      <Row>
        <PapersDetails carsId={carId} />
      </Row>
    </Container>
  );
};

export default FicheTechniqueScreen;
