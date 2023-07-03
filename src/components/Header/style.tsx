import styled from 'styled-components'
import * as RadixAvatar from '@radix-ui/react-avatar'
import * as RadixSwitch from '@radix-ui/react-switch'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Container = styled.header`
  grid-area: head;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  box-shadow: 0px 1px 3px 1px rgba(0,0,0, 0.15);

  z-index: 100;

  h3{
    color: ${p => p.theme.colors.dark.blue7};
    font-weight: 500;
    font-size: 1.6rem;
  }

  div{
    display: flex;
    justify-content: end;
    align-items:  center;
    height: 100%;
    width: fit-content;
    gap: 1.2rem;

    label{

    }
  }

  `

export const Avatar = styled(RadixAvatar.Root)`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.light.gray8};
  color: ${p => p.theme.colors.light.gray11};
  display: flex;
  justify-content: center;
  align-items: center;

`
export const AvatarFallback = styled(RadixAvatar.Fallback)``

export const Switch = styled(RadixSwitch.Root)`
  width: 3.5rem;
  height: 2rem;
  border-radius: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  border: none; /*1px solid ${p => p.theme.colors.dark.gray10}; */
  background-color: ${p => p.theme.colors.light.gray8};
  &[data-state='checked'] {
    background-color: ${p => p.theme.colors.light.blue7};
  }
`

export const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.dark.gray10};

  transition: transform 100ms;
  transform: translateX(.3rem);
  will-change: transform;
  &[data-state='checked'] {
    background-color: ${p => p.theme.colors.dark.blue8};
    transform: translateX(1.6rem);
  }

`

export const DropdownMenuTrigger = styled(DropdownMenu.Trigger)`

  background: transparent;
  border: none;


`
export const DropdownMenuContent = styled(DropdownMenu.Content)`
  margin-right: 1rem;
  width: 13rem;
  padding: .8rem;
  /* border: 1px solid ${p => p.theme.colors.dark.gray11}; */
  border-radius: .4rem;
  background-color: ${p => p.theme.colors.light.gray1};
  box-shadow: 1px 4px 5px 0px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  display: flex;
  gap: .4rem;

  button{
    width: 100%;
    background-color: ${p => p.theme.colors.light.gray1};
    padding: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .4rem;

    &:hover{
      background-color: rgba(0, 0, 0, .08);
    }


  }

  .btQuit{
    color: ${p => p.theme.colors.light.red11};
  }

`

export const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  width: 100%;
  height: .1rem;
  background-color: rgba(0,0,0,.08);

`
