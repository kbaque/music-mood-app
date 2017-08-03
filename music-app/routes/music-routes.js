const express = require('express');
const musicRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const musicsController = require('../controllers/musics-controller');


musicRoutes.get('/', musicsController.index);
musicRoutes.post('/', authHelpers.loginRequired, musicsController.create);

musicRoutes.get('/add', authHelpers.loginRequired, (req, res) => {
  res.render('musics/music-add', {
    currentPage: 'add',
  });
});

musicRoutes.get('/:id', musicsController.show);
musicRoutes.get('/:id/edit', authHelpers.loginRequired, musicsController.edit);
musicRoutes.put('/:id', authHelpers.loginRequired, musicsController.update);
musicRoutes.delete('/:id', authHelpers.loginRequired, musicsController.delete);

module.exports = musicRoutes;
