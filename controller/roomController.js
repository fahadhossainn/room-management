const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const Room = require('../model/roomModel');
const AppError = require('../utils/appError');
const handleAsync = require('../utils/handleAsync');


const multerStorage = multer.memoryStorage();

const multerFilter = (req , file , callback) => {
    if(file.mimetype.startsWith('image')) callback(null , true);
    else callback(new AppError('Please upload an Image', 400) , false);
}

const upload = multer(
  {
      storage: multerStorage,
      fileFilter : multerFilter
  }
);

exports.uploadRoomPhoto = upload.single('photo');

exports.resizeRoomPhoto = handleAsync(async (req, res, next) => {

  if(!req.file) return next();

  req.body.photo = `room-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpg')
    .toFile(`public/img/rooms/${req.body.photo}`)

  next();
})

exports.getSingleRoom = handleAsync(async(req, res, next) => {

  const room = await Room.findOne({room : req.params.room});
  
  if(!room) return next(new AppError('There is no such room', 404));
  
      res.status(200).json({
          status:'success',
          data : {
              room
          }
      });
})

exports.createRoom = handleAsync(async(req, res, next) => {

      if(!(req.user.role === 'admin')) {
        return next( new AppError('You are not allowed to perform this action', 403));
        }

      const room = await Room.create(req.body);
      res.status(201).json({
          status:'success',
          data : room 
      });
})
exports.updateRoom = handleAsync( async(req, res, next) => {

      if(req.user.role !== 'admin') {
          return next( new AppError('You are not allowed to perform this action', 403));
        }

      const room = await Room.findOneAndUpdate({room : req.params.room} , req.body , {
        new:true,
        runValidators : true
      });
      
      if(!room) return next(new AppError('There is no such room', 404));
      
          res.status(200).json({
              status:'success',
              data : {
                  room
              }
          });
})

exports.deleteRoom = handleAsync( async(req, res, next) => {

      if(req.user.role !== 'admin') {
          return next( new AppError('You are not allowed to perform this action', 403));
        }

      const room = await Room.findOneAndRemove({room : req.params.room});
            
      if(!room) return next(new AppError('There is no such room', 404));
      
      res.status(204).json({
          status:'success',
          data : null
      });
})

exports.getAllRooms = handleAsync(async(req, res, next) => {

      const rooms = await Room.find();
            
      res.status(200).json({
          status:'success',
          results : rooms.length,
          data : {
              rooms
          }
      });
})


