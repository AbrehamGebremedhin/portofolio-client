import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  Stack
} from '@mui/material';
import { Delete, Edit, Add, Close } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    techStack: '',
    images: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      setError('Error fetching projects');
      console.error(err);
    }
  };

  const handleOpen = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        link: project.link,
        techStack: project.techStack.join(', '),
        images: []
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        link: '',
        techStack: '',
        images: []
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      link: '',
      techStack: '',
      images: []
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link);
    formDataToSend.append('techStack', JSON.stringify(formData.techStack.split(',').map(tech => tech.trim())));
    
    formData.images.forEach(image => {
      formDataToSend.append('images', image);
    });

    try {
      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, formDataToSend);
        setSuccess('Project updated successfully');
      } else {
        await axios.post('/api/projects', formDataToSend);
        setSuccess('Project created successfully');
      }
      fetchProjects();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.msg || 'Error saving project');
      console.error(err);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${projectId}`);
        setSuccess('Project deleted successfully');
        fetchProjects();
      } catch (err) {
        setError('Error deleting project');
        console.error(err);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Project Management
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Add Project
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={logout}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card>
              <CardMedia
                component="img"
                sx={{ 
                  width: '100%',
                  height: '263px',
                  objectFit: 'contain',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)'
                }}
                image={project.images[0]?.url || '/placeholder.jpg'}
                alt={project.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {project.description}
                </Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  {project.techStack.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(project)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(project._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Add New Project'}
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Project Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Tech Stack (comma-separated)"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              margin="normal"
              required
              helperText="Enter technologies separated by commas (e.g., React, Node.js, MongoDB)"
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {formData.images.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected {formData.images.length} images
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
