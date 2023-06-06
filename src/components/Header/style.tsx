import { AppBar, Menu } from '@mui/material'
import styled from 'styled-components'

export const Appbar = styled(AppBar)`
  /* background-color: ${p => p.theme.palette.grey[900]}; */
  flex-direction: row;
  div{
    width: 100%;
    min-height: fit-content;
    justify-content: space-between;
  }

`

export const UserMenu = styled(Menu)`
  margin-top: 1.2rem;
  li{
    gap: .4rem;
  }


`
