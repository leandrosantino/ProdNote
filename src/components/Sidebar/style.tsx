import styled from 'styled-components'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

export const Aside = styled.aside`
  grid-area: 'side';
  background-color: ${p => p.theme.colors.dark.blue4};
  color: ${p => p.theme.colors.dark.gray12};

  h2{
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 1.5px solid rgba(255,255,255,.1);
    font-size: 2.4rem;
    font-weight: 500;
    padding: 2rem;

    span{
      color: ${p => p.theme.colors.dark.blue11};
    }
  }
`

export const ToggleGroupRoot = styled(ToggleGroup.Root)`
  margin-top: 1.6rem;
  gap: .4rem;
  width: 100%;
  padding: .8rem;
  display: flex;
  flex-direction: column;
`

export const ToggleGroupItem = styled(ToggleGroup.Item)`
  background-color: transparent;
  color: ${p => p.theme.colors.dark.gray12};
  display: flex;
  justify-content: start;
  border-radius: .8rem;
  padding: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  transition: all .2s;
  border: none;

  &[data-state="on"]{
    background-color: rgba(255,255,255,.1);

  }

  &[data-state="off"]{
    &:hover{
      background-color: rgba(255,255,255,.06);
    }
  }
`
