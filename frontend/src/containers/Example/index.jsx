import React from "react";
import { Col, Container, Row } from "reactstrap";
import PieChart from "./components/PieChart";
import ExampleCard from "./components/ExampleCard";

const DashboardScreen = () => {
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Sncft Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ExampleCard />
        </Col>
        <Col md={6}>
          <PieChart />
        </Col>
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
