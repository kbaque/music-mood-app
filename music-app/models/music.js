const db = require('../db/config');

const Music = {};

Music.findAll = () => {
  return db.query('SELECT * FROM musics');
}

Music.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM musics
    WHERE id = $1
  `, [id]);
}

Music.create = (music, userid) => {
  return db.one(`
    INSERT INTO musics
    (mood, title, artist, genre, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [music.mood, music.title, music.aritst, music.genre, userid]);
}

Music.update = (music, id) => {
  return db.one(`
    UPDATE musics SET
    mood = $1,
    title = $2,
    artist = $3
    genre = $4
    WHERE id = $5
    RETURNING *
  `, [music.mood, music.title, music.artist, music.genre, id]);
}

Music.destroy = (id) => {
  return db.none(`
    DELETE FROM musics
    WHERE id = $1
  `, [id]);
}

module.exports = Music;
