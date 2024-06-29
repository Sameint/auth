import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Auth
          </Typography>
          <Button color="inherit" href='/Signin' >Login</Button>
          <Button color="inherit" href='/Signup'>Signup</Button>
          <Button color="inherit" href='/Paginate'>Paginate</Button>
          <Button color="inherit" href='/InfiniteScrol'>Infinite-Scroll</Button>
          <Button color="inherit" href='/PaginationData'>Pagination</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
