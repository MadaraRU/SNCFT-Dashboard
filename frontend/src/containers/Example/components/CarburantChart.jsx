import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Col } from "reactstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CarburantChart = () => {
  const [carburant, setCarburant] = useState([]);

  const getCarburant = async () => {
    const response = await axios("http://localhost:5000/api/carburant");
    const data = await response.data;
    setCarburant(data);
  };

  let gasoil = carburant.filter((c) => c.type === "Gasoil")[0]?.quantite;
  let essence = carburant.filter((c) => c.type === "Essence")[0]?.quantite;

  useEffect(() => {
    getCarburant();
  }, []);

  const data = {
    labels: ["Gasoil", "Essence"],
    datasets: [
      {
        label: "# of Votes",
        data: [gasoil, essence],
        backgroundColor: [
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 255, 0.2)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206,85, 1)",
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206,85, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Col md={12} lg={12} xl={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              Quantites Total de carburants par nature
            </h5>
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

export default CarburantChart;
