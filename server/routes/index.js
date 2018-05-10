const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const mongoose = require('mongoose');
let Pinboard = mongoose.model('Pinboard');
let Post = mongoose.model('Post');
const auth = jwt({ secret: process.env.BACKEND_SECRET });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Server works');
});

// GET all Pinboards
router.get('/api/pinboards/', (req, res, next) => {
  let query = Pinboard.find().populate('posts');
  query.exec(function (err, pinboards) {
    if (err) return next(err);
    res.json(pinboards);
  });
});

// POST new Pinboard
router.post('/api/pinboards/', auth, (req, res, next) => {
  Post.create(req.body.posts, function (err, po) {
    if (err) return next(err);
    let pinboard = new Pinboard({
      city: req.body.city,
      location: {
        longitude: req.body.location.longitude,
        latitude: req.body.location.latitude
      }
    });
    pinboard.posts = po;
    pinboard.save(function (err, rec) {
      if (err) return next(err);
      res.json(rec);
    });
  });
});

// GET Pinboard by ObjectId (see Id in DB)
router.get('/api/pinboard/:pinboard', function (req, res, next) {
  res.json(req.pinboard);
});

router.param('pinboard', function (req, res, next, id) {
  let query = Pinboard.findById(id).populate('posts');
  query.exec(function (err, pinboard) {
    if (err) return next(err);
    if (!pinboard) return next(new Error(`Pinboard with id ${id} not found`));
    req.pinboard = pinboard;
    return next();
  });
});


// router.delete('/API/recipe/:recipe', auth, function(req, res) {
//   Ingredient.remove({ _id: { $in: req.recipe.ingredients } }, function(err) {
//     if (err) return next(err);
//     req.recipe.remove(function(err) {
//       if (err) {
//         return next(err);
//       }
//       res.json(req.recipe);
//     });
//   });
// });

router.post('/api/pinboard/:pinboard/posts', function (req, res, next) {
  let po = new Post(req.body);
  po.save(function (err, post) {
    if (err) return next(err);
    req.pinboard.posts.push(post);
    req.pinboard.save(function (err, req) {
      if (err) return next(err);
      res.json(post);
    });
  });
});


module.exports = router;
