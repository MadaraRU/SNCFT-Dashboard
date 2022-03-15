import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ProfileDetails from "./components/ProfileDetails";
import ProfileUpdate from "./components/ProfileUpdate";

const ExamplePage = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Profile</h3>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <ProfileDetails />
        </Col>
        <Col md={8}>
          <ProfileUpdate />
        </Col>
      </Row>
    </Container>
  );
};

export default ExamplePage;
