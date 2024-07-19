// routes/blogRoutes.js
const express = require('express');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog, getBlogByAuthor, incrementLikes } = require('../controllers/blogController');
const router = express.Router();
const authenticateToken = require("../middleware/authenticate")

router.get('/allblog', getAllBlogs);
router.post('/createblog', authenticateToken,createBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', updateBlog);
router.delete('/blog/:id', deleteBlog);
router.get('/author/:author', getBlogByAuthor);
router.patch('/blog/:id/like', incrementLikes); // Route for incrementing likes

module.exports = router;
