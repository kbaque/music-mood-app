const Music = require('../models/music');

const musicController = {};

musicController.index = (req, res) => {
  Music.findAll()
    .then(musics => {
      res.render('musics/music-index', {
        music: res.locals.song,
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
      res.render('musics/music-add', {
        // currentPage: 'show',
        message: 'ok',
        data: music,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

musicController.getSong =(req, res, next)=> {
  console.log ("we are in the API call");
  console.log (req.body);

fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.API_KEY}&artist=${req.body.artist}&track=${req.body.song}&format=json`)
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
      console.log("below the object");
      console.log (jsonRes)

      let songName=jsonRes.track.name;
      let artistName=jsonRes.track.artist.name;
      res.locals.song = jsonRes.track.name;
      res.locals.artist = jsonRes.track.artist.name;
      console.log(res.locals.song +" local");
      console.log( res.locals.artist + " local");
      return next();
    }).catch(err => {
      console.log(err);
    })
}


//api create
musicController.createFromAPI= (req, res) => {
  Music.create({
    mood: "empty",
    title: res.locals.song,
    artist: res.locals.artist,
    genre: "empty",
  } /*,req.user.id*/).then(() => {
    res.redirect('/musics');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

musicController.create = (req, res) => {
  Music.create({
    mood: req.body.mood,
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
  }, req.user.id).then(() => {
    res.redirect('/musics');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

//api update
// musicController.update = (req, res) => {
//   Music.update({
//     mood: "empty",
//     title: res.locals.song,
//     artist: res.locals.artist,
//     genre: "empty",
//   }, req.params.id).then(music => {
//     res.redirect(`/musics/${req.params.id}`);
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// // };
// musicController.update = (req, res) => {
//   console.log(req.body)
//   Music.update({
//     mood: "empty",
//     title: req.body.title,
//     artist: req.body.artist,
//     genre: "empty",
//   }).then(music => {
//     res.render('musics/music-single',{
//       data: music
//     })
//   })
// }

// musicController.update = (req, res) => {
//   Music.update({
//     mood: "empty",
//     title: res.locals.song,
//     artist: res.locals.artist,
//     genre: "empty",
//   }, req.params.id).then(music => {
//     res.redirect(`/musics/${req.params.id}`);
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// };


//(`/musics/${req.params.id}`);//

musicController.update= (req, res) => {//coresct
  Music.update({
    mood: req.body.mood,
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
  }, req.params.id).then(music => {
    //res.redirect(`/musics/${req.params.id}`);
    res.redirect('/musics');

  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

musicController.edit = (req, res) => {
  console.log ("here here --------------------------");
  Music.findById(req.params.id)
    .then(music => {
      console.log ("see below");
      console.log (music);
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
