const Archive = require("../models/archiveModel");

const historyMiddleware = async (req, res, next) => {
  const reqMethode = req.method;
  const URL = req.route.path;
  const baseUrl = req.baseUrl;
  const originalUrl = req.originalUrl;
  const params = req.params.id;
  const body = req.body;

  const lookupTable = {
    "/": baseUrl.includes("parc") ? "parc" : "user",
    "/:id/mission": "mission",
    "/:id/cars": "voiture",
    "/:id/fini": "mission",
    "/:id/broken": "voiture",
    "/:id/unbroken": "voiture",
    // "/:id/available": "voiture",
    // "/:id/unavailable": "voiture",
    "/:id/annuller": "mission",
    "/:id": baseUrl.includes("parc") ? "parc" : "user",
  };

  const actionsTable = {
    POST: "Ajouter",
    PUT: originalUrl.includes("fini")
      ? "Terminer"
      : originalUrl.includes("annuller")
      ? "Annuller"
      : originalUrl.includes("broken")
      ? "En panne"
      : originalUrl.includes("unbroken")
      ? "Marche"
      : "Modifer",
    DELETE: "Supprimer",
  };

  let message = `${lookupTable[URL]} ${
    actionsTable[reqMethode] === "Supprimer" ||
    actionsTable[reqMethode] === "Modifer" ||
    actionsTable[reqMethode] === "Annuller" ||
    actionsTable[reqMethode] === "Terminer" ||
    actionsTable[reqMethode] === "Marche" ||
    actionsTable[reqMethode] === "En panne"
      ? params
      : ""
  } ${
    lookupTable[URL] === "user" && body.userName !== undefined
      ? body.userName
      : lookupTable[URL] === "parc" && body.reference !== undefined
      ? body.reference
      : lookupTable[URL] === "mission" && body.reference !== undefined
      ? body.nom
      : lookupTable[URL] === "voiture" && body.reference !== undefined
      ? body.matricule
      : ""
  } ${actionsTable[reqMethode]} par ${
    req.user?.userName ? req.user?.userName : "admin"
  }`;

  console.log(message);

  const archive = await Archive.create({
    action: actionsTable[reqMethode],
    category: lookupTable[URL],
    message: message,
    createdBy: req.user?.userName,
  });

  await archive.save();

  next();
};

module.exports = { historyMiddleware };
