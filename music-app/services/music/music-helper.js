require('isomorphic-fetch');
require('dotenv').config();

// var song = "believe";
// var artist = "Cher";

function getSong(req, res, next){
  console.log ("we are in the API call");

  console.log (req.body);
  console.log (req.query);
  console.log (req.param);
  console.log (req.body.artist + "checking");
  let song=req.body.title;
  let artist=req.body.artist;


  //fetch('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=adb996cc86b3b7f1af160d22046efa17&artist=edsheeran&track=photograph&format=json')
  fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.API_KEY}&artist=${artist}&track=${song}&format=json`)
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
      console.log("below the object");

      //song name
      let songName=jsonRes.track.name;
      //artist name
      let artistName=jsonRes.track.artist.name;
      // console.log(songName);
      // console.log(artistName);
      res.locals.song = jsonRes.track.name;
      res.locals.artist = jsonRes.track.artist.name;
      console.log(res.locals.song);
      console.log( res.locals.artist);
      //res.locals.song = jsonRes.main; //////
      return next();
    }).catch(err => {
      console.log(err);
      return next();
    })
}

module.exports = {
  getSong,
}



