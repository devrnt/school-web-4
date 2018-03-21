const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
let Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Server works');
});

router.get('/posts', (req, res, next) => {
  Post.find((err, posts) => {
    if (err) { return next(err); }
    res.json(posts);
  });
})

router.post('/posts/add', (req, res, next) => {
  let newPost = new Post(req.body);
  newPost.save((err, rec) => {
    if (err) { return next(err); }
    res.json(rec);
  })
});

module.exports = router;
