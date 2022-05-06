import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardBody, Col } from "reactstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExampleCard = () => {
  const [cars, setCars] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getAllCars = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios("http://localhost:5000/api/voiture/", config);
    const data = await response.data;
    setCars(data);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  let damagedCars = cars?.filter((c) => c.etat === "en panne");
  let undamagedCars = cars?.filter((c) => c.etat === "marche");

  let data = {
    labels: ["En panne", "Marche"],
    datasets: [
      {
        label: "# of Votes",
        data: [damagedCars.length, undamagedCars.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", ,],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Col md={12} lg={12} xl={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">les etats du voitures</h5>
          </div>
          <div>
            <Doughnut
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

export default ExampleCard;

// import React from "react";

// import { Card, CardBody, Col } from "reactstrap";

// const ExampleCard = () => {
//   return (
//     <Col md={12}>
//       <Card>
//         <CardBody>
//           <div className="card__title">
//             <h5 className="bold-text">Example title</h5>
//             <h5 className="subhead">Example subhead</h5>
//           </div>
//           <p>Your content here</p>
//         </CardBody>
//       </Card>
//     </Col>
//   );
// };

// export default ExampleCard;
