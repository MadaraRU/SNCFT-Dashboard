import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, reset } from "../../../../store/users/usersSlice";
import { useHistory } from "react-router-dom";

const ProfileDetails = () => {
  const { profile } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory;

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    } else {
      history.push("/log_in");
    }

    dispatch(reset());
  }, [dispatch, history, user]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Détails de l'utilisateur: </h5>
          </div>
          <Container>
            <Row className="my-1">
              <Col
                style={{
                  backgroundColor: "#1F2F61",
                  color: "white",
                }}
              >
                Nom:{" "}
              </Col>
              <Col>{profile.name}</Col>
            </Row>
            <Row>
              <Col
                style={{
                  backgroundColor: "#1F2F61",
                  color: "white",
                }}
              >
                Username:{" "}
              </Col>
              <Col>{profile.userName}</Col>
            </Row>
            <Row className="my-1">
              <Col
                style={{
                  backgroundColor: "#1F2F61",
                  color: "white",
                }}
              >
                Role:{" "}
              </Col>
              <Col>{profile.role}</Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileDetails;
