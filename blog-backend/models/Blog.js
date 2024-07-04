// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, 
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs who liked the blog
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
