const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();



router.post('/', (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      req.status(500).json({ message: 'error adding the user' })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPost = { ...req.body, user_id: req.params.id }
  Posts.insert(newPost)
    .then(post => {
      res.status(210).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error posting' })
    })
});

router.get('/', validateUser, (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json('Error', err)
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(user => {
      if (user > 0) {
        res.status(200).json({ message: 'user deleted' })
      } else {
        res.status(404).json({ message: 'user id could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'user could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating user' })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(400).json({ message: 'invalid user id' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'reques failed', err })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' })
  } else if (req.name) {
    res.status(400).json({ message: 'missing require name' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' })
  } else if (req.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next()
  }
}

module.exports = router;
