import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Link,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import { Launch, ChevronLeft, ChevronRight } from '@mui/icons-material';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom align="center">
        My Projects
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.images[0]?.url || '/placeholder.jpg'}
                alt={project.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(project)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.name}
                  {project.link && (
                    <IconButton 
                      size="small" 
                      href={project.link} 
                      target="_blank"
                      sx={{ ml: 1 }}
                    >
                      <Launch />
                    </IconButton>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {project.techStack.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedProject}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            <img
              src={selectedProject.images[currentImageIndex]?.url}
              alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
              style={{ width: '100%', height: 'auto' }}
            />
            {selectedProject.images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
};

export default Home;
