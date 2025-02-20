// routes/blogRoutes.js
const express = require('express');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog, getBlogByAuthor, incrementLikes } = require('../controllers/blogController');
const router = express.Router();

router.get('/allblog', getAllBlogs);
router.post('/createblog',createBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', updateBlog);
router.delete('/blog/:id', deleteBlog);
router.get('/author/:author', getBlogByAuthor);
router.patch('/blog/:id/like', incrementLikes);

module.exports = router;
