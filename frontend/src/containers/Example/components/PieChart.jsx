import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardBody, Col } from "reactstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [mission, setMission] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getMissions = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await axios("http://localhost:5000/api/mission", config);
    const data = await response.data;
    setMission(data);
  };

  let enCours = mission?.filter((m) => m.missionStatus === "en cours");
  let fini = mission?.filter((m) => m.missionStatus === "fini");
  let annuller = mission?.filter((m) => m.missionStatus === "annuller");

  useEffect(() => {
    getMissions();
  }, []);

  const data = {
    labels: ["annuller", "fini", "en cours"],
    datasets: [
      {
        label: "# of Votes",
        data: [annuller.length, fini.length, enCours.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",

          "rgba(75, 192, 192, 0.2)",

          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",

          "rgba(75, 192, 192, 1)",

          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Col md={12} lg={12} xl={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Details des missions</h5>
          </div>
          <div>
            <Pie
              data={data}
              width="250"
              height="250"
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PieChart;
