import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import ExampleCard from "./components/ExampleCard";

const ExamplePage = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
    if (user.role !== "admin") {
      history.replace("/dashboard/home");
    }
  }, [history, user, user.role]);

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Gestion des utilisateurs</h3>
        </Col>
      </Row>
      <Row>
        <ExampleCard />
      </Row>
    </Container>
  );
};

export default ExamplePage;
