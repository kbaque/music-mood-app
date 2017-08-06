const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.index = (req, res) => {
  console.log('userController');
  User.findUserMusics(req.user.id)
    .then(musics => {
        res.json({
        user: req.user,
        data: 'Put a user profile on this route',
        musics: musics,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({err: err});
    });
}

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      //res.redirect('/user');
      res.redirect('/musics');//enter route for profile
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;
