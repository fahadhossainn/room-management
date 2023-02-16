const express = require('express');
const roomController = require('../controller/roomController');
const authController = require('../controller/authController');

const router = express.Router();


router
    .route('/')
    .get(roomController.getAllRooms)
    .post(authController.protect, roomController.uploadRoomPhoto , roomController.resizeRoomPhoto, roomController.createRoom)

router
    .route('/:room')
    .get(roomController.getSingleRoom)
    .patch(authController.protect, roomController.uploadRoomPhoto , roomController.resizeRoomPhoto, roomController.updateRoom)
    .delete(authController.protect, roomController.deleteRoom)


module.exports = router;