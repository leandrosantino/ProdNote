import { IconButton, MenuItem, Toolbar, Typography } from '@mui/material'
import { Appbar, UserMenu } from './style'
import { AccountCircle, ExitToApp, Person, Brightness7, Brightness4 } from '@mui/icons-material'
import { useState } from 'react'
import { useThemeMode } from '../../hooks/useThemeMode'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function Header () {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { mode, setMode } = useThemeMode()
  const { signOut, isAuth } = useAuth()

  return (
    <Appbar position="relative" isauth={isAuth ? 1 : 0}>
      <Toolbar>

        <Typography variant="h6" component="h1">
          Aldler Pelzer Group
        </Typography>

        {isAuth && <>
          <IconButton
            aria-controls="menu-appbar"
            onClick={handleMenu}
            color="inherit"
            size="medium"
          >
            <AccountCircle fontSize="medium" {...mode === 'dark' ? { color: 'primary' } : {}} />
          </IconButton>

          <UserMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              handleClose()
              navigate('userInfo')
            }}>
              <Typography>Info. do Usuário</Typography>
              <Person />
            </MenuItem>

            <MenuItem onClick={() => {
              setMode(mode === 'dark' ? 'light' : 'dark')
              handleClose()
            }}>
              <Typography>Modo {mode === 'dark' ? 'Claro' : 'Escuro'}</Typography>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </MenuItem>

            <MenuItem onClick={() => {
              signOut()
              handleClose()
            }}>
              <Typography>Sair</Typography>
              <ExitToApp />
            </MenuItem>

          </UserMenu>
        </>}

      </Toolbar>
    </Appbar >
  )
}
