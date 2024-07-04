const express = require('express');
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog ,getBlogByauthor } = require('../controllers/blogController');
const router = express.Router();

router.get('/allblog', getAllBlogs);
router.post('/createblog', createBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', updateBlog);
router.delete('/blog/:id', deleteBlog);
router.get("/author/:author",getBlogByauthor)
module.exports = router;
