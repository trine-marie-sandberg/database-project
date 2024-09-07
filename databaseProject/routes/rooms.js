var express = require('express');
var router = express. Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var RoomService = require("../services/roomservice")
var db = require("../models");
var roomService = new RoomService(db);
/* GET rooms listing. */
router.get('/:hotelId', async function(req, res, next) {
  const rooms =  await roomService.getHotelRooms(req.params.hotelId);
  res.render('rooms', { rooms: rooms });
});

router.get('/', async function(req, res, next) {
    const rooms = await roomService.get();
    res.render('rooms', { rooms: rooms });
});

router.post('/', jsonParser, async function(req, res, next) {
  let Capacity = req.body.Capacity;
  let PricePerDay = req.body.PricePerDay;
  let HotelId = req.body.HotelId;
  await roomService.create(Capacity, PricePerDay, HotelId);
  res.end()
});

router.delete('/', jsonParser, async function(req, res, next) {
  let id = req.body.id;
  await roomService.deleteRoom(id);
  res.end()
});

module.exports = router;