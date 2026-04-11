import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import reyalyIcon from '../assets/reyaly-icon.ico';
import type { NavbarProps } from '../utils/types';

function Navbar({ page, setPage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (page: "home" | "about" | "predictor" | "visualizations") => {
    setPage(page);
    setAnchorEl(null);
    navigate(`/${page === 'home' ? '' : page}`);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img id="reyaly-icon" src={reyalyIcon} alt="Reyaly Icon" />
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Reyaly Disease Predictor
              </Typography>
            </a>
          </div>

          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleSelect('home')}>Home</MenuItem>
                <MenuItem onClick={() => handleSelect('about')}>About</MenuItem>
                <MenuItem onClick={() => handleSelect('predictor')}>Disease Predictor</MenuItem>
                <MenuItem onClick={() => handleSelect('visualizations')}>Data Visualizations</MenuItem>   
              </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;