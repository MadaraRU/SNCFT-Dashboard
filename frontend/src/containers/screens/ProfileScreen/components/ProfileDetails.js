import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, reset } from "../../../../store/users/usersSlice";
import { useHistory, Redirect } from "react-router-dom";

const ProfileDetails = () => {
  const { profile } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory;

  // if (!user) {
  //   history.replace("/");
  // }

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    } else {
      // history.replace("/");
      return <Redirect to="/" />;
    }

    return () => {
      dispatch(reset());
    };
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
                  width: "100%",
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
                  width: "100%",
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
                  width: "100%",
                }}
              >
                Role:{" "}
              </Col>
              <Col>{profile.role}</Col>
            </Row>
            <Row className="my-1">
              <Col
                style={{
                  backgroundColor: "#1F2F61",
                  color: "white",
                  width: "100%",
                }}
              >
                Departement:{" "}
              </Col>
              <Col>{profile.departement}</Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileDetails;
