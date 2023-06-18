import styled from 'styled-components'
import { ToggleButton } from '@mui/material'

export const PageButton = styled(ToggleButton)`
  color: ${(p) =>
    p.theme.palette.mode == 'dark'
      ? p.theme.palette.grey[100]
      : p.theme.palette.grey[900]
  };
  font-size: 12px;
  justify-content: start;
  border-radius: 0;
  border-top: none !important;
  border: none;
  border-left-color: ${(p) =>
    p.theme.palette.primary.main
  };
  border-left-style: solid;
  border-left-width: ${(p) => p.selected ? '4px' : '0'};
`

export const Aside = styled.aside`
  background-color: ${(p) =>
    p.theme.palette.mode == 'dark'
      ? p.theme.palette.grey[900]
      : p.theme.palette.grey[300]
  };
  div{
    width: 100%;
    padding: 8px;
    gap: 4px;
  }

`
