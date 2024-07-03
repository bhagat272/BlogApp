const express = require('express');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const router = express.Router();

router.get('/allblog', getAllBlogs);
router.post('/createblog', createBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog:id', updateBlog);
router.delete('/blog:id', deleteBlog);

module.exports = router;
