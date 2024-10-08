const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const router = require("./routes/parcRoutes");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/parc", require("./routes/parcRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/mission", require("./routes/missionRoutes"));

app.use("/api/voiture/", require("./routes/carRoutes"));

app.use("/api/archive", require("./routes/archiveRoutes"));

app.use("/api/carburant", require("./routes/carburantRoutes"));

app.use("/api/carte", require("./routes/carteCarburantRoutes"));

app.use("/api/personnel", require("./routes/personnelRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
