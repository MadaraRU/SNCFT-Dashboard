import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProfileDetails from "./components/ProfileDetails";
import ProfileUpdate from "./components/ProfileUpdate";

const ExamplePage = () => (
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

export default ExamplePage;
