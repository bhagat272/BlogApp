// controllers/blogController.js
const Blog = require('../models/Blog');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  const { title, content, category, author } = req.body;
  try {
    const blog = await Blog.create({ title, content, category, author });
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({ error: error.message });
  }
};

// Increment likes for a blog post
exports.incrementLikes = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Assuming userId is passed in the request body

  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: `Blog with ID ${id} not found` });
    }

    // Check if the user has already liked the blog
    if (blog.likedBy.includes(userId)) {
      return res.status(400).json({ error: 'User has already liked this blog' });
    }

    // Increment likes and add userId to likedBy array
    blog.likes++;
    blog.likedBy.push(userId);
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error(`Error incrementing likes for blog ${id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: `Blog with ID ${req.params.id} not found` });
    }
  } catch (error) {
    console.error(`Error fetching blog by ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

// Get blogs by author
exports.getBlogByAuthor = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.author });
    if (blogs) {
      res.json(blogs);
    } else {
      res.status(404).json({ error: `Blogs by author ${req.params.author} not found` });
    }
  } catch (error) {
    console.error(`Error fetching blogs by author ${req.params.author}:`, error);
    res.status(500).json({ error: error.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: `Blog with ID ${req.params.id} not found` });
    }
  } catch (error) {
    console.error(`Error updating blog by ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      res.json({ message: 'Blog deleted successfully' });
    } else {
      res.status(404).json({ error: `Blog with ID ${req.params.id} not found` });
    }
  } catch (error) {
    console.error(`Error deleting blog by ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};
