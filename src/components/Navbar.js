import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GitHub, LinkedIn, Description } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700
            }}
          >
            My Portfolio
          </Typography>
          <Stack direction="row" spacing={2}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                component="a"
                href="/cv.pdf"
                download
                startIcon={<Description />}
                sx={{ color: 'inherit' }}
              >
                Download CV
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                component="a"
                href="https://github.com/AbrehamGebremedhin"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHub />}
                sx={{ color: 'inherit' }}
              >
                GitHub
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                component="a"
                href="https://linkedin.com/in/abreham-gebremedhin"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkedIn />}
                sx={{ color: 'inherit' }}
              >
                LinkedIn
              </Button>
            </motion.div>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
