import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ReferenceIcon from "mdi-react/SmartCardOutlineIcon";
import DepartementIcon from "mdi-react/DomainIcon";
import LocalisationIcon from "mdi-react/MapMarkerOutlineIcon";
import CapaciteIcon from "mdi-react/HumanCapacityIncreaseIcon";
import DeleteIcon from "mdi-react/DeleteOutlineIcon";
import UpdateIcon from "mdi-react/CogOutlineIcon";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getParcs,
  reset,
  setParc,
  removeParc,
} from "../../../../store/parc/parcSlice";
import "../style/style.css";

const ParcDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc } = useSelector((state) => state.parc);

  // Modal handler
  const [modal, setModal] = useState(false);
  const [modalU, setModalU] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleU = () => setModalU(!modalU);

  // Form control , Form submit handler
  const [formData, setFormData] = useState({
    reference: "",
    departement: "",
    localisation: "",
    capacite: 0,
  });
  const [isDeleted, setIsDeleted] = useState(false);

  const { reference, departement, localisation, capacite } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault(e);

    if (!departement || !reference || !localisation || !capacite) {
      return;
    }

    dispatch(setParc({ reference, localisation, capacite, departement }));

    setFormData({
      reference: "",
      departement: "",
      localisation: "",
      capacite: 0,
    });
  };

  //form update handler
  const [formDataU, setFormDataU] = useState({
    referenceU: undefined,
    departementU: undefined,
    localisationU: undefined,
    capaciteU: undefined,
  });
  const [parcIdU, setParcIdU] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { referenceU, departementU, localisationU, capaciteU } = formDataU;

  const onChangeU = (e) => {
    setFormDataU((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateParc = async (pId, parcU) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios.put(
      "http://localhost:5000/api/parc/" + pId,
      parcU,
      config
    );

    if (response) {
      setUpdated(true);
    }

    return response.data;
  };

  const submitHandlerU = (e) => {
    e.preventDefault();

    // dispatch(updateParc({ parcIdU, formDataU }));

    updateParc(parcIdU, {
      reference: referenceU,
      departement: departementU,
      localisation: localisationU,
      capacite: capaciteU,
    });

    setFormDataU({
      referenceU: "",
      departementU: "",
      localisationU: "",
      capaciteU: "",
    });

    if (isUpdated) {
      toggleU();
    }

    setIsUpdated(!isUpdated);
  };

  // Get parc

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }

    dispatch(getParcs());

    if (isDeleted) {
      dispatch(getParcs());
    }

    if (updated) {
      dispatch(getParcs());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, history, isDeleted, updated]);

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">DÉTAILS DE Parcs</h5>
              </div>
            </Col>
            <Col md={2}>
              <Button
                className="btn btn-primary"
                style={{ color: "white" }}
                onClick={toggle}
              >
                + Ajouter un parc
              </Button>
              <Modal size="m" isOpen={modal} toggle={toggle}>
                <ModalHeader>Ajouter un parc</ModalHeader>
                <form className="form" onSubmit={submitHandler}>
                  <div
                    className="account__wrapper"
                    style={{
                      width: "100%",
                    }}
                  >
                    <ModalBody style={{ height: "50vh" }}>
                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Reference
                        </span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <ReferenceIcon />
                          </div>
                          <input
                            className="modal-input"
                            name="reference"
                            type="text"
                            id="reference"
                            placeholder="Reference"
                            value={reference}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Departement
                        </span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <DepartementIcon />
                          </div>
                          <input
                            className="modal-input"
                            name="departement"
                            type="text"
                            id="departement"
                            placeholder="Departement"
                            value={departement}
                            onChange={onChange}
                          />
                        </div>
                      </div>

                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Localisation
                        </span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <LocalisationIcon />
                          </div>
                          <input
                            name="localisation"
                            className="modal-input"
                            id="localisation"
                            placeholder="Localisation"
                            value={localisation}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="form__form-group">
                        <span className="form__form-group-label">Capacite</span>
                        <div className="form__form-group-field">
                          <div className="form__form-group-icon">
                            <CapaciteIcon />
                          </div>
                          <input
                            className="modal-input"
                            name="capacite"
                            type="number"
                            id="capacite"
                            placeholder="Capacite"
                            value={capacite}
                            onChange={onChange}
                            min="1"
                          />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" type="submit" onClick={toggle}>
                        Ajouter
                      </Button>
                    </ModalFooter>
                  </div>
                </form>
              </Modal>
            </Col>
          </Row>
          <div>
            <Table responsive className="admin-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Departement</th>
                  <th>Localisation</th>
                  <th>Capacite</th>
                  <th>Voiture</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {parc.map((p) => {
                  return (
                    <tr key={p._id}>
                      <td>{p.reference}</td>
                      <td>{p.departement}</td>
                      <td>{p.localisation}</td>
                      <td>{p.capacite}</td>
                      <td>
                        <div className="d-flex ">
                          <Button
                            className="btn btn-sm btn-primary"
                            style={{ color: "white" }}
                            onClick={() => {
                              props.onShow(p._id);
                            }}
                          >
                            Voire voiture
                          </Button>
                        </div>
                      </td>
                      <td>
                        <button
                          style={{
                            border: "none",
                            height: "100%",
                          }}
                          className="btn-outline-danger btn-sm
                          "
                          onClick={() => {
                            dispatch(removeParc(p._id));
                            setIsDeleted(!isDeleted);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          id="update-button"
                          style={{
                            border: "none",
                            height: "100%",
                          }}
                          className="btn-outline btn-sm
                          "
                          onClick={toggleU}
                        >
                          <UpdateIcon />
                        </button>
                      </td>
                      <Modal size="m" isOpen={modalU} toggle={toggleU}>
                        <ModalHeader>Modifier le parc</ModalHeader>
                        <form className="form" onSubmit={submitHandlerU}>
                          <div
                            className="account__wrapper"
                            style={{
                              width: "100%",
                            }}
                          >
                            <ModalBody style={{ height: "50vh" }}>
                              <div className="form__form-group">
                                <span className="form__form-group-label">
                                  Reference
                                </span>
                                <div className="form__form-group-field">
                                  <div className="form__form-group-icon">
                                    <ReferenceIcon />
                                  </div>
                                  <input
                                    className="modal-input"
                                    name="referenceU"
                                    type="text"
                                    id="referenceU"
                                    placeholder={p.reference}
                                    value={
                                      referenceU === undefined
                                        ? p.reference
                                        : referenceU
                                    }
                                    onChange={onChangeU}
                                  />
                                </div>
                              </div>
                              <div className="form__form-group">
                                <span className="form__form-group-label">
                                  Departement
                                </span>
                                <div className="form__form-group-field">
                                  <div className="form__form-group-icon">
                                    <DepartementIcon />
                                  </div>
                                  <input
                                    className="modal-input"
                                    name="departementU"
                                    type="text"
                                    id="departementU"
                                    placeholder={p.departement}
                                    value={
                                      departementU === undefined
                                        ? p.departement
                                        : departementU
                                    }
                                    onChange={onChangeU}
                                  />
                                </div>
                              </div>

                              <div className="form__form-group">
                                <span className="form__form-group-label">
                                  Localisation
                                </span>
                                <div className="form__form-group-field">
                                  <div className="form__form-group-icon">
                                    <LocalisationIcon />
                                  </div>
                                  <input
                                    name="localisationU"
                                    className="modal-input"
                                    id="localisationU"
                                    placeholder={p.localisation}
                                    value={
                                      localisationU === undefined
                                        ? p.localisation
                                        : localisationU
                                    }
                                    onChange={onChangeU}
                                  />
                                </div>
                              </div>
                              <div className="form__form-group">
                                <span className="form__form-group-label">
                                  Capacite
                                </span>
                                <div className="form__form-group-field">
                                  <div className="form__form-group-icon">
                                    <CapaciteIcon />
                                  </div>
                                  <input
                                    className="modal-input"
                                    name="capaciteU"
                                    type="number"
                                    id="capaciteU"
                                    placeholder={p.capacite}
                                    value={
                                      capaciteU === undefined
                                        ? p.capacite
                                        : capaciteU
                                    }
                                    onChange={onChangeU}
                                    step="1"
                                  />
                                </div>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="success"
                                type="submit"
                                onClick={() => {
                                  setParcIdU(p._id);
                                  setIsUpdated(!isUpdated);
                                }}
                              >
                                Modifier
                              </Button>
                            </ModalFooter>
                          </div>
                        </form>
                      </Modal>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ParcDetails;
