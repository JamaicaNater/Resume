import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";


const ProfileMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settingsMap = {
        'Profile': () => {
          navigate('/profile')
          handleCloseUserMenu();
        }, 
        // 'Account': () => {
        //   handleCloseUserMenu();
        // }, 
        // 'Dashboard': () => {
        //   handleCloseUserMenu();
        // }, 
        'Logout': () => {
          logout();
          handleCloseUserMenu();
        }
    };

    return(
        <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.picture ?? "/static/images/avatar/2.jpg"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settingsMap).map((setting) => (
                <MenuItem key={setting} onClick={settingsMap[setting]}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </>
    );
}

export default ProfileMenu;