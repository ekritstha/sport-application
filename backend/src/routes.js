const express = require("express");
const multer = require("multer");

const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./Controllers/DashboardController");
const uploadConfig = require("./config/upload");
const LoginController = require("./Controllers/LoginController");
const RegistrationController = require("./Controllers/RegistrationController");
const ApprovalController = require("./Controllers/AprovalController");
const RejectionController = require("./Controllers/RejectionController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});

//Registration
routes.post("/registration/:eventId", RegistrationController.create);
routes.get(
  "/registration/:registration_id",
  RegistrationController.getRegistration
);

//Aproval
routes.post(
  "/registration/:registration_id/approval",
  ApprovalController.approval
);

//Rejection
routes.post(
  "/registration/:registration_id/rejection",
  RejectionController.rejection
);

//Login
routes.post("/login", LoginController.store);

//Dashboard
routes.get("/dashboard", DashboardController.getAllEvents);
routes.get("/dashboard/:sport", DashboardController.getAllEvents);
routes.get("/user/events", DashboardController.getEventsByUserId);
routes.get("/event/:eventId", DashboardController.getEventById);

//Event
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.delete("/event/:eventId", EventController.delete);

//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
