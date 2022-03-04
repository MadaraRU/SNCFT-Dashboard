import React, { useState, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getUserProfile,
  reset,
  updateUserProfile,
} from "../../../../store/users/usersSlice";

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  // const updateUserProfile = async () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   };

  //   const { data } = await axios.put(
  //     "http://localhost:5000/api/users/profile",
  //     {
  //       name,
  //       userName,
  //       password,
  //     },
  //     config
  //   );
  //   setIsSubmitted(true);
  // };

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    } else {
      setName(profile.name);
      setuserName(profile.userName);
    }
    if (isSubmitted) {
      dispatch(getUserProfile());
      setIsSubmitted(false);
    }
  }, [history, dispatch, user, profile, isSubmitted]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      setIsSubmitted(false);
      return;
    }
    if (password.trim().length === 0 || confirmPassword.trim().length === 0) {
      setMessage("Ce champ ne doit pas rester vide");
      setIsSubmitted(false);
      return;
    }
    dispatch(updateUserProfile({ name, userName, password }));
    dispatch(reset());
    setIsSubmitted(true);
    setConfirmPassword("");
    setPassword("");
    setMessage(null);
  };
  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Mettre à jour le profil: </h5>
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Nom: </Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder={profile.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                value={userName}
                placeholder={profile.userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer votre nouveau mot de passe"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage(null);
                }}
                value={password}
                onBlur={() => setMessage(null)}
              />
              {message && <p style={{ color: "red" }}>{message}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmer votre mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {message && <p style={{ color: "red" }}>{message}</p>}
            </Form.Group>
            <Button variant="primary" type="submit">
              Mettre a jour
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileUpdate;
