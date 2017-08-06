const express = require('express');
const musicRouter = express.Router();

const musicHelper = require('../services/music/music-helper');
const musicController = require('../controllers/musics-controller');


musicRouter.post('/', function(){
  console.log ("it works")}, musicHelper.getSong, );


//musicRouter.post('/', musicHelper.getSong, musicController.index);
musicRouter.get('/', musicHelper.getSong, musicController.index);

module.exports = musicRouter;
