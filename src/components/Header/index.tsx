import { Avatar, AvatarFallback, Container, Switch, SwitchThumb } from './style'

export function Header () {
  return (
    <Container>

      <h3>Adler Pelzer Group</h3>

      <div>

        <label htmlFor="airplane-mode">
        light
        </label>

        <Switch id="airplane-mode">
          <SwitchThumb/>
        </Switch>

        <Avatar>
          <AvatarFallback>
            PR
          </AvatarFallback>
      </Avatar>
      </div>

    </Container>
  )
}

// <Appbar position="relative" isauth={isAuth ? 1 : 0}>
//   <Toolbar>

//     <Typography variant="h6" component="h1">
//       Aldler Pelzer Group
//     </Typography>

//     {isAuth && <>
//       <IconButton
//         aria-controls="menu-appbar"
//         onClick={handleMenu}
//         color="inherit"
//         size="medium"
//       >
//         <AccountCircle fontSize="medium" {...mode === 'dark' ? { color: 'primary' } : {}} />
//       </IconButton>

//       <UserMenu
//         id="menu-appbar"
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right'
//         }}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={() => {
//           handleClose()
//           navigate('userInfo')
//         }}>
//           <Typography>Info. do Usuário</Typography>
//           <Person />
//         </MenuItem>

//         <MenuItem onClick={() => {
//           setMode(mode === 'dark' ? 'light' : 'dark')
//           handleClose()
//         }}>
//           <Typography>Modo {mode === 'dark' ? 'Claro' : 'Escuro'}</Typography>
//           {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
//         </MenuItem>

//         <MenuItem onClick={() => {
//           signOut()
//           handleClose()
//         }}>
//           <Typography>Sair</Typography>
//           <ExitToApp />
//         </MenuItem>

//       </UserMenu>
//     </>}

//   </Toolbar>
// </Appbar >
