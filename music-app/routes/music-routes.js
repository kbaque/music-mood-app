const express = require('express');
const musicRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
// const musicRouter = express.Router();

const musicHelper = require('../services/music/music-helper');
const musicsController = require('../controllers/musics-controller');


musicRoutes.get('/', musicHelper.getSong, musicsController.index);

musicRoutes.get('/', musicsController.index);
musicRoutes.post('/', authHelpers.loginRequired, musicsController.create);


// musicRoutes.post('/search', function(){
//   console.log ("hey hey hey");
// });

musicRoutes.post('/search', musicsController.getSong,
musicsController.createFromAPI, function(){
  console.log ("hey hey hey");
});

musicRoutes.get('/add'/*, authHelpers.loginRequired*/, (req, res) => {
  res.render('musics/music-add', {
    currentPage: 'add',
  });
});

//API routes
musicRoutes.get('/', musicHelper.getSong, musicsController.create);
musicRoutes.get('/', musicHelper.getSong, musicsController.update);

musicRoutes.get('/add', musicsController.show);
musicRoutes.get('/:id/edit'/*, authHelpers.loginRequired*/, musicsController.edit);
musicRoutes.put('/:id', authHelpers.loginRequired, musicsController.update);
musicRoutes.delete('/:id', authHelpers.loginRequired, musicsController.delete);

module.exports = musicRoutes;
