var express = require('express');
var router = express.Router();
var HotelService = require("../services/hotelservice")
var db = require("../models");
var hotelService = new HotelService(db);
/* GET hotels listing. */
router.get('/', async function(req, res, next) {
  const hotels = await hotelService.get();
  res.send(hotels);
});

module.exports = router;