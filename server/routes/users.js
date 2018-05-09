const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// register 
router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  let user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save(function (err) {
    if (err) { return next(err); }
    return res.json({ token: user.generateJWT() })
  });
});

// login
router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function (req, res, next) {
  User.find({ username: req.body.username },
    function (err, result) {
      if (result.length) {
        res.json({ 'username': 'alreadyexists' })
      } else {
        res.json({ 'username': 'ok' })
      }
    });
});

router.post('/likedPosts', function (req, res, next) {
  console.log('+====== '+ req.body.username);
  
  let query = User.findOne({ username: req.body.username }).populate('likedPosts');
  query.exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error(`User with username ${req.body.username} not found`));
    return res.json(user.likedPosts);
  });
});

router.post('/likePost', function (req, res, next) {
  let queryFindUser = User.findOne({ username: req.body.username }).populate('likedPosts');
  queryFindUser.exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error(`User with username ${req.body.username} not found`));
    let usr = user;

    let queryFindPost = Post.findByIdAndUpdate(req.body.postId, { $inc: { likes: 1 } });
    queryFindPost.exec(function (err, post) {
      if (err) return next(err);
      if (!post) return next(new Error(`Post with id ${req.body.postId} is not found`));
      // no check if post is already in likedPosts 
      console.log(post)
      usr.likedPosts.push(post);
      console.log(usr.likedPosts);
      usr.save(function (err) {
        if (err) return next(err);
        return res.json(usr.likedPosts);
      });
    })

  });
});

// router.post('/unLikePost', function (req, res, next) {
//   let queryFindUser = User.findOneAndUpdate({ username: req.body.username }).populate('likedPosts');
//   queryFindUser.exec(function (err, user) {
//     if (err) return next(err);
//     if (!user) return next(new Error(`User with username ${req.body.username} not found`));
//     let usr = user;

//     let queryFindPost = Post.findOneAndUpdate(req.body.postId, { $inc: { likes: -1 } });
//     queryFindPost.exec(function (err, post) {
//       if (err) return next(err);
//       if (!post) return next(new Error(`Post with id ${req.body.postId} is not found`));
//       // no check if post is already in likedPosts 
//       let idk = User.update({ username: req.body.username }, { $pull: { likedPosts: post } });
//       idk.exec(function(err, updatedUser){
//         if (err) return next(err);
//         let updatedUser = up
//       })
//       usr.save(function (err) {
//         if (err) return next(err);
//         return res.json(usr.likedPosts);
//       });
//     })

//   });
// });
module.exports = router;
