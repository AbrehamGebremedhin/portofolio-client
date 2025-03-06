import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
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
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin/login"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Admin
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
