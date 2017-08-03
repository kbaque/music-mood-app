const Music = require('../models/music');

const musicController = {};

musicController.index = (req, res) => {
  Music.findAll()
    .then(musics => {
      res.render('musics/music-index', {
        currentPage: 'index',
        message: 'ok',
        data: musics,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
};

musicController.show = (req, res) => {
  Music.findById(req.params.id)
    .then(music => {
      res.render('musics/music-single', {
        currentPage: 'show',
        message: 'ok',
        data: music,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

musicController.create = (req, res) => {
  Music.create({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
  }, req.user.id).then(() => {
    res.redirect('/musics');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

musicController.update = (req, res) => {
  Music.update({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
  }, req.params.id).then(music => {
    res.redirect(`/musics/${req.params.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

musicController.edit = (req, res) => {
  Music.findById(req.params.id)
    .then(music => {
      res.render('musics/music-single-edit', {
        currentPage: 'edit',
        data: music,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

musicController.delete = (req, res) => {
  Music.destroy(req.params.id)
    .then(() => {
      res.redirect('/musics');
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = musicController;
