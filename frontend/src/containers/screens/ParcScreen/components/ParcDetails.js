import React, { useEffect } from "react";
import { Col, Card, CardBody, Table, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getParcs, reset } from "../../../../store/parc/parcSlice";

const ParcDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { parc } = useSelector((state) => state.parc);

  useEffect(() => {
    if (!user) {
      history.replace("/log_in");
    }

    dispatch(getParcs());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, history]);

  return (
    <Col
      md={12}
      style={{
        paddingRight: "2rem",
        paddingLeft: "2rem",
      }}
    >
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">DÉTAILS DE Parcs</h5>
          </div>
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Departement</th>
                  <th>Localisation</th>
                  <th>Capacite</th>
                  <th>Voiture</th>
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
                        <Button
                          className="btn btn-primary"
                          style={{ color: "white" }}
                        >
                          Voire voiture
                        </Button>
                      </td>
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
