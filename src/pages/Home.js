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
  IconButton,
  Dialog,
  DialogContent,
  Avatar,
  Paper
} from '@mui/material';
import { Launch, ChevronLeft, ChevronRight } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';

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
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ 
          mb: 8, 
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)',
            zIndex: -1,
            animation: 'pulse 4s infinite'
          },
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
            '100%': { transform: 'scale(1)' }
          }
        }}
      >
        <Avatar
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          src="/profile-picture.jpg"
          alt="Abreham Gebremedhin"
          sx={{
            width: 200,
            height: 200,
            mx: 'auto',
            mb: 4,
            boxShadow: '0 0 20px rgba(25, 118, 210, 0.3)',
            border: '4px solid rgba(25, 118, 210, 0.2)'
          }}
        />
        <Paper 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          elevation={0} 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            p: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Hi, I'm Abreham Gebremedhin
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            I am a Machine Learning Engineer passionate about creating intelligent systems and solving complex problems.
            With expertise in deep learning, neural networks, and data science, I develop innovative AI solutions
            that make a real impact.
          </Typography>
        </Paper>
      </Box>

      <Typography 
        component={motion.h1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        variant="h1" 
        gutterBottom 
        align="center"
      >
        My Projects
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(25, 118, 210, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.2)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="263"
                  image={project.images[0]?.url || '/placeholder.jpg'}
                  alt={project.name}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    objectFit: 'contain',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
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
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedProject}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.3 }
        }}
      >
        {selectedProject && (
          <DialogContent sx={{ p: 2, position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                maxHeight: '60vh',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={selectedProject.images[currentImageIndex]?.url}
                alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  maxHeight: '450px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)'
                }}
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
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                      color: 'white'
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
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                      color: 'white'
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}
            </Box>
            <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
              {selectedProject.name} - Image {currentImageIndex + 1} of {selectedProject.images.length}
            </Typography>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
};

export default Home;
