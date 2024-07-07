import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogByAuthor, deleteBlog, updateBlog } from '../redux/slices.js/blogSlice';
import DOMPurify from 'dompurify';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Button, IconButton, Modal, TextField, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const AuthorBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorBlogs, status, error } = useSelector((state) => state.blogs);
  const author = localStorage.getItem('author');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (author) {
      dispatch(fetchBlogByAuthor(author));
    }
  }, [author, dispatch]);

  const handleDeleteModalOpen = (blogId) => {
    setSelectedBlogId(blogId);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setSelectedBlogId(null);
  };

  const handleDeleteBlog = () => {
    dispatch(deleteBlog(selectedBlogId));
    handleDeleteModalClose();
  };

  const handleEditBlog = (blog) => {
    setEditMode(true);
    setEditedBlog({
      title: blog.title,
      content: blog.content,
    });
    setSelectedBlogId(blog._id);
  };

  const handleSaveEdit = () => {
    dispatch(updateBlog({ id: selectedBlogId, updatedBlog: editedBlog }));
    setEditMode(false);
    setEditedBlog({
      title: '',
      content: '',
    });
    setSelectedBlogId(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedBlog({
      title: '',
      content: '',
    });
    setSelectedBlogId(null);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center mt-5 text-xl text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="mb-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            fontSize: '16px',
            padding: '8px 16px',
            backgroundColor: '#f0f4f8',
            borderColor: '#007bff',
            color: '#007bff',
            '&:hover': {
              backgroundColor: '#e0e7ef',
              borderColor: '#0056b3',
            },
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Back
        </Button>
      </div>
      <h2 className="text-3xl font-bold text-center mb-10">
        Blogs by <span className="text-indigo-600">{author}</span>
      </h2>
      <p className="mb-4">
        <ThemeSwitcher />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {authorBlogs?.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-600">No blogs found for this author.</div>
        ) : (
          authorBlogs?.map((blog) => (
            <div
              key={blog._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {editMode && selectedBlogId === blog._id ? (
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={editedBlog.title}
                    onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
                    className="mb-2"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Content"
                    variant="outlined"
                    value={editedBlog.content}
                    onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
                    className="mb-2"
                  />
                  <div className="flex gap-4">
                    <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-700">{blog.title}</h3>
                  <div
                    className="text-gray-800 mb-4"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                  />
                  <p className="mt-4 text-sm text-gray-500">
                    Published on {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end mt-4">
                    <IconButton aria-label="Edit" onClick={() => handleEditBlog(blog)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => handleDeleteModalOpen(blog._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleDeleteModalClose} className="modal">
        <div className="modal-content">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="text-gray-700 mb-4">Are you sure you want to delete this blog?</p>
          <div className="flex justify-end">
            <Button variant="contained" color="primary" onClick={handleDeleteBlog}>
              Delete
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorBlogs;
