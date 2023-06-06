import { IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import { Appbar, UserMenu } from "./style";
import { AccountCircle, ExitToApp, Person } from "@mui/icons-material";
import { useState } from "react";

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Appbar position="relative" >
      <Toolbar>

        <Typography variant="h5" component="span">
          Aldler Pelzer Group
        </Typography>

        <>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            size="medium"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <UserMenu
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
            <MenuItem onClick={handleClose}>
              <Typography>Info. do Usuário</Typography>
              <Person />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography>Sair</Typography>
              <ExitToApp />
            </MenuItem>
          </UserMenu>
        </>

      </Toolbar>
    </Appbar>
  )
}
