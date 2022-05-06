import React from "react";
import { Col, Container, Row } from "reactstrap";
import PieChart from "./components/PieChart";
import ExampleCard from "./components/ExampleCard";
import CarburantChart from "./components/CarburantChart";

const DashboardScreen = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Sncft Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <ExampleCard />
        <PieChart />
        <CarburantChart />
        <PieChart />
      </Row>
    </Container>
  );
};

export default DashboardScreen;

// import React from "react";
// import { Col, Container, Row } from "reactstrap";
// import ExampleCard from "./components/ExampleCard";

// const DashboardScreen = () => {
//   return (
//     <Container className="dashboard">
//       <Row>
//         <Col md={12}>
//           <h3 className="page-title">Sncft Dashboard</h3>
//         </Col>
//       </Row>
//       <Row>
//         <ExampleCard />
//       </Row>
//     </Container>
//   );
// };

// export default DashboardScreen;
