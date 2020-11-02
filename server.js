// const Joi = require("joi");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/bookings", function (request, response) {
  response.json(bookings);
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

app.get("/bookings/:id", (req, res) => {});

app.post("/bookings", (req, res) => {
  // const { error } = valiDateBooking(req.body);
  

  const booking = {
    id: bookings.length + 1,
    title: req.body.title,
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    roomId: req.body.roomId,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  };
  if (!booking) return res.status(400).send(error.details[0].message);
  bookings.push(booking);
  res.json(booking);
});

//Delete a booking
app.delete("/bookings/:id", (req, res) => {
  const booking = bookings.find((item) => item.id === parseInt(req.params.id));
  if (!booking)
    return res.status(404).send("The booking with the given ID not found");

  const index = bookings.indexOf(booking);
  bookings.splice(index, 1);

  res.json(booking);
});

//Find a booking
app.get("/bookings/:id", (req, res) => {
  const booking = bookings.find((item) => item.id === parseInt(req.params.id));
  if (!booking)
    return res.status(404).send("The booking with the given ID not found");

  res.json(booking);
});

// Joi validation function
// function valiDateBooking(booking) {
//   const schema = {
//     id: Joi.string().min(1).reguired(),
//     title: Joi.string().min(1).reguired(),
//     firstName: Joi.string().min(1).reguired(),
//     surname: Joi.string().min(1).reguired(),
//     email: Joi.string().min(1).reguired(),
//     roomId: Joi.string().min(1).reguired(),
//     checkInDate: Joi.string().min(1).reguired(),
//     checkOutDate: Joi.string().min(1).reguired(),
//   };
//   return Joi.validate(booking, schema);
// }
const port = 4000;
const listener = app.listen(process.env.PORT || port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
