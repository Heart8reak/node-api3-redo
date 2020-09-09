const express = require('express');
const Posts = require('../posts/postDb')

const router = express.Router();

router.use((req, res, next) => {
  console.log('postRouter')
  next()
})

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting posts' })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(post => {
      if (posts > 0) {
        res.status(200).json({ message: 'post deleted' })
      } else {
        res.status(404).json({ message: 'post id not found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error deleting post' })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'post could not be found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error updating post' })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params

  Posts.getById(id)
    .then(post => {
      if (post) {
        req.post = post
      } else {
        res.status(400).json({ message: 'invalid post id' })
      }
    })

}

module.exports = router;
