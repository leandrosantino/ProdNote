import styled from 'styled-components'
import { ToggleButton } from '@mui/material'


export const PageButton = styled(ToggleButton)`
  color: ${(p) =>
    p.theme.palette.mode == 'dark' ?
      p.theme.palette.grey[100] :
      p.theme.palette.grey[900]
  };
  font-size: 1.2rem;
  justify-content: start;
  border-radius: 0;
  border: none;
  border-top-width: 0;
  border-left-color: ${(p) =>
    p.theme.palette.mode == 'dark' ?
      p.theme.palette.grey[100] :
      p.theme.palette.primary.main
  };
  border-left-style: solid;
  border-left-width: ${(p) => p.selected ? '.4rem' : '0'};
`


export const Aside = styled.aside`
  background-color: ${(p) =>
    p.theme.palette.mode == 'dark' ?
      p.theme.palette.grey[900] :
      p.theme.palette.grey[300]
  };
  div{
    width: 100%;
    padding: .8rem;
    gap: .4rem;
  }

`
