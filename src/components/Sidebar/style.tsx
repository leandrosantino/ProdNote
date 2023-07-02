import styled from 'styled-components'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

export const Aside = styled.aside`
  background-color: ${(p) =>
    p.theme.palette.mode === 'dark'
      ? p.theme.palette.grey[900]
      : p.theme.palette.grey[300]
  };
`

export const ToggleGroupRoot = styled(ToggleGroup.Root)`
  gap: 4px;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

export const ToggleGroupItem = styled(ToggleGroup.Item)`

  &[data-state="on"]{
    background-color: rgba(0,0,0,.1);
    border-left-color: ${(p) =>
      p.theme.palette.primary.main
    };
    border-left-style: solid;

  }

  &[data-state="off"]{
    &:hover{
      background-color: rgba(0,0,0,.06);
    }
  }

  transition: all .2s;


  display: flex;

  background-color: transparent;
  font-size: 16px;
  justify-content: start;
  padding: 16px;
  border: none;

`
